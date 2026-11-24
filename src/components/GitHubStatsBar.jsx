import React, { useState, useEffect } from 'react';
import { Star, GitFork, ExternalLink, Activity } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { personalData } from '../portfolioData';

const CACHE_KEY = 'wf_github_stats_v1';
const CACHE_TTL_MS = 15 * 60 * 1000;

export default function GitHubStatsBar() {
  const [stats, setStats] = useState({
    loading: true,
    live: false,
    publicRepos: personalData.projects.length,
    followers: 0,
    stars: 0,
    recentRepos: []
  });

  useEffect(() => {
    let active = true;

    async function loadStats() {
      try {
        const cachedRaw = sessionStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw);
          if (Date.now() - cached.savedAt < CACHE_TTL_MS && active) {
            setStats({ ...cached.data, loading: false });
            return;
          }
        }
      } catch {
        // Ignore sessionStorage parse issues
      }

      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/WorkuFikadu'),
          fetch('https://api.github.com/users/WorkuFikadu/repos?sort=updated&per_page=6')
        ]);

        if (!userRes.ok || !reposRes.ok) {
          throw new Error('GitHub API unavailable');
        }

        const user = await userRes.json();
        const repos = await reposRes.json();

        const stars = Array.isArray(repos)
          ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
          : 0;

        const recentRepos = Array.isArray(repos)
          ? repos.slice(0, 4).map((r) => ({
              name: r.name,
              url: r.html_url,
              language: r.language || 'Code',
              stars: r.stargazers_count || 0
            }))
          : [];

        const nextData = {
          live: true,
          publicRepos: typeof user.public_repos === 'number' ? user.public_repos : personalData.projects.length,
          followers: typeof user.followers === 'number' ? user.followers : 0,
          stars,
          recentRepos
        };

        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data: nextData }));
        } catch {
          // Ignore storage quota issues
        }

        if (active) {
          setStats({ ...nextData, loading: false });
        }
      } catch {
        if (active) {
          setStats((prev) => ({
            ...prev,
            loading: false,
            live: false,
            publicRepos: personalData.projects.length
          }));
        }
      }
    }

    loadStats();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="github-stats-bar card-glass">
      <div className="github-stats-top">
        <div className="github-profile-pill">
          <GithubIcon size={18} />
          <div>
            <strong>@WorkuFikadu</strong>
            <span>{stats.live ? 'Live GitHub Activity' : 'Featured Engineering Index'}</span>
          </div>
        </div>

        <div className="github-metrics-row">
          <div className="gh-metric">
            <GitFork size={14} className="text-accent" />
            <span><strong>{stats.publicRepos}</strong> Public Repos</span>
          </div>
          {stats.live && (
            <>
              <div className="gh-metric">
                <Activity size={14} className="text-emerald" />
                <span><strong>{stats.followers}</strong> Followers</span>
              </div>
              <div className="gh-metric">
                <Star size={14} className="text-amber" />
                <span><strong>{stats.stars}</strong> Recent Stars</span>
              </div>
            </>
          )}
        </div>

        <a
          href={personalData.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline btn-sm"
        >
          <span>GitHub Profile</span>
          <ExternalLink size={13} />
        </a>
      </div>

      {stats.recentRepos.length > 0 && (
        <div className="github-recent-repos">
          <span className="gh-recent-label">Recently Active:</span>
          <div className="gh-recent-chips">
            {stats.recentRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="gh-repo-chip"
              >
                <span className="gh-repo-name">{repo.name}</span>
                <span className="gh-repo-lang">{repo.language}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
