import React from 'react';
import ContributionCard from '../components/ContributionCard';

const fetchContributions = async (user: string, startingYear?: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/contributions?user=${user}&startingYear=${startingYear}`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

const ContributionPage = async () => {
  const user = 'Sivamani-18';
  const startingYear = 2020;

  const data = await fetchContributions(user, startingYear);

  return (
    <div>
      <h1>Contribution Graph</h1>
      <ContributionCard
        data={data}
        params={{ theme: 'default', locale: 'en' }}
      />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default ContributionPage;
