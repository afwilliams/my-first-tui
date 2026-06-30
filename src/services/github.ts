export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export interface GitHubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubUser[];
}

const GITHUB_API = "https://api.github.com";

export async function searchUsers(query: string): Promise<GitHubUser[]> {
  if (!query.trim()) return [];

  const url = `${GITHUB_API}/search/users?q=${encodeURIComponent(query)}+in:login&per_page=20`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "dotfile-manager-tui",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data: GitHubSearchResponse = await response.json();
    return data.items;
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}