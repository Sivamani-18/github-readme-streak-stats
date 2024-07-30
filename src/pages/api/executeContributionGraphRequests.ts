// src/pages/api/contributions.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { buildContributionGraphQuery } from '../../utils/buildContributionGraphQuery';

const GITHUB_TOKENS = process.env.GITHUB_TOKENS?.split(',') ?? [];

const getGitHubToken = (): string => {
  if (GITHUB_TOKENS.length === 0) throw new Error('No GitHub tokens available');
  return GITHUB_TOKENS[Math.floor(Math.random() * GITHUB_TOKENS.length)];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user, startingYear } = req.query;

  if (typeof user !== 'string') {
    return res.status(400).json({ error: 'Invalid user parameter' });
  }

  const currentYear = new Date().getFullYear();
  const startingYearInt = startingYear
    ? parseInt(startingYear as string)
    : currentYear;

  const years = Array.from(
    { length: currentYear - startingYearInt + 1 },
    (_, i) => startingYearInt + i
  );

  try {
    const token = getGitHubToken();
    const queries = years.map((year) => {
      const query = buildContributionGraphQuery(user, year);
      return axios.post(
        'https://api.github.com/graphql',
        { query },
        {
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
    });

    const responses = await Promise.all(queries);
    const data = responses.reduce((acc: any, response: any, idx: any) => {
      acc[years[idx]] = response.data.data;
      return acc;
    }, {});

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
