import axios from 'axios';
import { Expense } from '../model/expenses';

import parseLink, { Links } from 'parse-link-header';
import { Currency } from '../constants/currencies';

const isLastPage = (pageLinks: Links) => {
  return (
    Object.keys(pageLinks).length === 2 && pageLinks.first && pageLinks.prev
  );
};

export interface ExpensesListResult {
  // pageLinks: Links | null
  pageCount: number;
  totalCount: number;
  expenses: Expense[];
}

export async function getExpenses(
  page = 1,
  limit = 25,
  currency: Currency | null
): Promise<ExpensesListResult> {
  const url = `//localhost:4000/expenses`;

  const params = {
    _page: page,
    _limit: limit,
    _sort: 'date',
    _order: 'desc',
    currency
  };

  try {
    const res = await axios.get<Expense[]>(url, {
      params
    });

    const { headers } = res;

    const totalCount = parseInt(headers['x-total-count']);
    const pageCount = Math.ceil(totalCount / limit);

    // const pageLinks = parseLink(res.headers.link);

    return {
      expenses: res.data,
      pageCount,
      totalCount
    };
  } catch (err) {
    throw err;
  }
}

// export async function getRepoDetails(org: string, repo: string) {
//   const url = `https://api.github.com/repos/${org}/${repo}`;

//   const { data } = await axios.get<RepoDetails>(url);
//   return data;
// }

// export async function getIssue(org: string, repo: string, number: number) {
//   const url = `https://api.github.com/repos/${org}/${repo}/issues/${number}`;

//   const { data } = await axios.get<Issue>(url);
//   return data;
// }

// export async function getComments(url: string) {
//   const { data } = await axios.get<Comment[]>(url);
//   return data;
// }
