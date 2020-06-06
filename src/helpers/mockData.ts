import { MockData } from '../types'

const localData = {
  updates: [
    { id: "5513", date: "June 05 2020", goal: "111", user: "22" },
    { id: "5514", date: "June 04 2020", goal: "111", user: "22" },
    { id: "5515", date: "June 03 2020", goal: "111", user: "22" },
    { id: "5516", date: "June 02 2020", goal: "111", user: "22" },
    { id: "5517", date: "June 01 2020", goal: "111", user: "22" },
    { id: "5518", date: "June 01 2020", goal: "111", user: "22" },
    { id: "5519", date: "June 01 2020", goal: "111", user: "22" },
    { id: "5520", date: "May 31 2020", goal: "111", user: "27" },
    { id: "5521", date: "May 30 2020", goal: "111", user: "27" },
    { id: "5522", date: "May 29 2020", goal: "111", user: "27" },
    { id: "5523", date: "May 29 2020", goal: "111", user: "27" },
    { id: "5524", date: "May 27 2020", goal: "111", user: "27" },
    { id: "5525", date: "May 26 2020", goal: "111", user: "27" },
    { id: "5526", date: "May 24 2020", goal: "111", user: "27" },
    { id: "5527", date: "May 24 2020", goal: "111", user: "27" },
    { id: "5528", date: "May 21 2020", goal: "111", user: "27" },
    { id: "5529", date: "May 21 2020", goal: "111", user: "27" },
    { id: "5530", date: "May 21 2020", goal: "111", user: "27" },
    { id: "5531", date: "May 19 2020", goal: "111", user: "27" },
    { id: "5532", date: "May 19 2020", goal: "111", user: "27" },
    { id: "5533", date: "May 16 2020", goal: "111", user: "27" },
    { id: "5534", date: "May 16 2020", goal: "111", user: "27" },
    { id: "5535", date: "May 16 2020", goal: "111", user: "27" },
    { id: "5536", date: "May 12 2020", goal: "111", user: "27" },
    { id: "5537", date: "May 12 2020", goal: "111", user: "27" },
    { id: "5538", date: "May 12 2020", goal: "111", user: "27" },
    { id: "5539", date: "May 10 2020", goal: "111", user: "27" },
    { id: "5540", date: "May 08 2020", goal: "111", user: "27" },
    { id: "5541", date: "May 08 2020", goal: "111", user: "27" },
    { id: "5542", date: "May 08 2020", goal: "111", user: "27" },
    { id: "5543", date: "May 08 2020", goal: "111", user: "27" },
    { id: "5544", date: "May 08 2020", goal: "111", user: "27" },
    { id: "5545", date: "May 08 2020", goal: "111", user: "27" },
    { id: "5546", date: "May 03 2020", goal: "111", user: "27" },
    { id: "5547", date: "May 02 2020", goal: "111", user: "27" },
    { id: "5548", date: "May 01 2020", goal: "111", user: "27" },
    { id: "5549", date: "April 30 2020", goal: "111", user: "18" },
    { id: "5550", date: "April 30 2020", goal: "111", user: "18" },
    { id: "5551", date: "April 30 2020", goal: "111", user: "18" },
    { id: "5552", date: "April 30 2020", goal: "111", user: "18" },
    { id: "5553", date: "April 29 2020", goal: "111", user: "18" },
    { id: "5554", date: "April 29 2020", goal: "111", user: "18" },
    { id: "5555", date: "April 27 2020", goal: "111", user: "18" },
    { id: "5556", date: "April 26 2020", goal: "111", user: "18" },
    { id: "5557", date: "April 24 2020", goal: "111", user: "18" },
    { id: "5558", date: "April 24 2020", goal: "111", user: "18" },
    { id: "5559", date: "April 21 2020", goal: "111", user: "18" },
    { id: "5560", date: "April 21 2020", goal: "111", user: "18" },
    { id: "5561", date: "April 21 2020", goal: "111", user: "18" },
    { id: "5562", date: "April 19 2020", goal: "111", user: "18" },
    { id: "5563", date: "April 19 2020", goal: "111", user: "18" },
    { id: "5564", date: "April 16 2020", goal: "111", user: "18" },
    { id: "5565", date: "April 12 2020", goal: "111", user: "18" },
    { id: "5566", date: "April 12 2020", goal: "111", user: "18" },
    { id: "5567", date: "April 10 2020", goal: "111", user: "18" },
    { id: "5568", date: "April 09 2020", goal: "111", user: "18" },
    { id: "5569", date: "April 03 2020", goal: "111", user: "18" },
    { id: "5570", date: "April 02 2020", goal: "111", user: "18" },
    { id: "5571", date: "April 01 2020", goal: "111", user: "18" },
    { id: "5572", date: "March 31 2020", goal: "111", user: "18" },
    { id: "5573", date: "March 30 2020", goal: "111", user: "18" },
    { id: "5574", date: "March 29 2020", goal: "111", user: "18" },
    { id: "5575", date: "March 29 2020", goal: "111", user: "18" },
    { id: "5576", date: "March 27 2020", goal: "111", user: "18" },
    { id: "5577", date: "March 26 2020", goal: "111", user: "18" },
    { id: "5578", date: "March 24 2020", goal: "111", user: "18" },
    { id: "5579", date: "March 24 2020", goal: "111", user: "18" },
    { id: "5580", date: "March 22 2020", goal: "111", user: "18" },
    { id: "5581", date: "March 22 2020", goal: "111", user: "18" },
    { id: "5582", date: "March 21 2020", goal: "111", user: "18" },
    { id: "5583", date: "March 19 2020", goal: "111", user: "18" },
    { id: "5584", date: "March 19 2020", goal: "111", user: "18" },
    { id: "5585", date: "March 16 2020", goal: "111", user: "18" },
    { id: "5586", date: "March 16 2020", goal: "111", user: "18" },
    { id: "5587", date: "March 16 2020", goal: "111", user: "18" },
    { id: "5588", date: "March 12 2020", goal: "111", user: "18" },
    { id: "5589", date: "March 12 2020", goal: "111", user: "18" },
    { id: "5591", date: "March 12 2020", goal: "111", user: "18" },
    { id: "5592", date: "March 11 2020", goal: "111", user: "18" },
    { id: "5593", date: "March 10 2020", goal: "111", user: "18" },
    { id: "5594", date: "March 08 2020", goal: "111", user: "18" },
    { id: "5595", date: "March 07 2020", goal: "111", user: "18" },
    { id: "5596", date: "March 07 2020", goal: "111", user: "18" },
    { id: "5597", date: "March 05 2020", goal: "111", user: "18" },
    { id: "5598", date: "March 05 2020", goal: "111", user: "18" },
  ],
  goals: [
    { id: "111", createdAt: "March 05 2020", updatedAt: "June 05 2020" },
  ],
  users: [
    { id: "18" },
    { id: "22" },
    { id: "27" },
  ]
}

function castAsDate(str: string): Date {
  return new Date(str)
}

function prepData(data: { updates: any, goals: any, users: any }): MockData {
  const { updates, goals, users } = data

  return {
    updates: updates.map(({ date, ...rest }: { date: any, rest: any }) => ({ ...rest, date: castAsDate(date) })),
    goals: goals.map(({ createdAt, updatedAt, ...rest }: any) => ({ ...rest, createdAt: castAsDate(createdAt), updatedAt: castAsDate(updatedAt) })),
    users
  }
}

const preppedData = prepData(localData)

console.log('prepped:', preppedData)

export const mockData = (): Promise<MockData> => Promise.resolve(preppedData)
