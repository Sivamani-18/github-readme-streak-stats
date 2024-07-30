// utils/buildContributionGraphQuery.ts
export function buildContributionGraphQuery(
  user: string,
  year: number
): string {
  const start = `${year}-01-01T00:00:00Z`;
  const end = `${year}-12-31T23:59:59Z`;
  return `
      query {
        user(login: "${user}") {
          createdAt
          contributionsCollection(from: "${start}", to: "${end}") {
            contributionYears
            contributionCalendar {
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;
}
