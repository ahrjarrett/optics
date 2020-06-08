import { MockData } from '../types'

const localData = {
  updates: [
    { id: "5513", date: new Date("June 05 2020"), goal: "111", user: "22" },
    { id: "5514", date: new Date("June 04 2020"), goal: "112", user: "22" },
    { id: "5515", date: new Date("June 03 2020"), goal: "113", user: "22" },
    { id: "5516", date: new Date("June 02 2020"), goal: "111", user: "22" },
    { id: "5517", date: new Date("June 01 2020"), goal: "111", user: "22" },
    { id: "5518", date: new Date("June 01 2020"), goal: "111", user: "22" },
    { id: "5519", date: new Date("June 01 2020"), goal: "111", user: "22" },
    { id: "5520", date: new Date("May 31 2020"), goal: "111", user: "27" },
    { id: "5521", date: new Date("May 30 2020"), goal: "111", user: "27" },
    { id: "5522", date: new Date("May 29 2020"), goal: "111", user: "27" },
    { id: "5523", date: new Date("May 29 2020"), goal: "111", user: "27" },
    { id: "5524", date: new Date("May 27 2020"), goal: "113", user: "27" },
    { id: "5525", date: new Date("May 26 2020"), goal: "111", user: "27" },
    { id: "5526", date: new Date("May 24 2020"), goal: "112", user: "27" },
    { id: "5527", date: new Date("May 24 2020"), goal: "111", user: "27" },
    { id: "5528", date: new Date("May 21 2020"), goal: "111", user: "27" },
    { id: "5529", date: new Date("May 21 2020"), goal: "111", user: "27" },
    { id: "5530", date: new Date("May 21 2020"), goal: "111", user: "27" },
    { id: "5531", date: new Date("May 19 2020"), goal: "111", user: "27" },
    { id: "5532", date: new Date("May 19 2020"), goal: "112", user: "27" },
    { id: "5533", date: new Date("May 16 2020"), goal: "111", user: "27" },
    { id: "5534", date: new Date("May 16 2020"), goal: "111", user: "27" },
    { id: "5535", date: new Date("May 16 2020"), goal: "111", user: "27" },
    { id: "5536", date: new Date("May 12 2020"), goal: "111", user: "27" },
    { id: "5537", date: new Date("May 12 2020"), goal: "113", user: "27" },
    { id: "5538", date: new Date("May 12 2020"), goal: "112", user: "27" },
    { id: "5539", date: new Date("May 10 2020"), goal: "112", user: "27" },
    { id: "5540", date: new Date("May 08 2020"), goal: "111", user: "27" },
    { id: "5541", date: new Date("May 08 2020"), goal: "112", user: "27" },
    { id: "5542", date: new Date("May 08 2020"), goal: "111", user: "27" },
    { id: "5543", date: new Date("May 08 2020"), goal: "111", user: "27" },
    { id: "5544", date: new Date("May 08 2020"), goal: "111", user: "27" },
    { id: "5545", date: new Date("May 08 2020"), goal: "111", user: "27" },
    { id: "5546", date: new Date("May 03 2020"), goal: "111", user: "27" },
    { id: "5547", date: new Date("May 02 2020"), goal: "111", user: "27" },
    { id: "5548", date: new Date("May 01 2020"), goal: "111", user: "27" },
    { id: "5549", date: new Date("April 30 2020"), goal: "111", user: "18" },
    { id: "5550", date: new Date("April 30 2020"), goal: "111", user: "18" },
    { id: "5551", date: new Date("April 30 2020"), goal: "111", user: "18" },
    { id: "5552", date: new Date("April 30 2020"), goal: "111", user: "18" },
    { id: "5553", date: new Date("April 29 2020"), goal: "111", user: "18" },
    { id: "5554", date: new Date("April 29 2020"), goal: "111", user: "18" },
    { id: "5555", date: new Date("April 27 2020"), goal: "111", user: "18" },
    { id: "5556", date: new Date("April 26 2020"), goal: "111", user: "18" },
    { id: "5557", date: new Date("April 24 2020"), goal: "111", user: "18" },
    { id: "5558", date: new Date("April 24 2020"), goal: "112", user: "18" },
    { id: "5559", date: new Date("April 21 2020"), goal: "111", user: "18" },
    { id: "5560", date: new Date("April 21 2020"), goal: "111", user: "18" },
    { id: "5561", date: new Date("April 21 2020"), goal: "111", user: "18" },
    { id: "5562", date: new Date("April 19 2020"), goal: "111", user: "18" },
    { id: "5563", date: new Date("April 19 2020"), goal: "111", user: "18" },
    { id: "5564", date: new Date("April 16 2020"), goal: "111", user: "18" },
    { id: "5565", date: new Date("April 12 2020"), goal: "111", user: "18" },
    { id: "5566", date: new Date("April 12 2020"), goal: "111", user: "18" },
    { id: "5567", date: new Date("April 10 2020"), goal: "111", user: "18" },
    { id: "5568", date: new Date("April 09 2020"), goal: "111", user: "18" },
    { id: "5569", date: new Date("April 03 2020"), goal: "111", user: "18" },
    { id: "5570", date: new Date("April 02 2020"), goal: "111", user: "18" },
    { id: "5571", date: new Date("April 01 2020"), goal: "111", user: "18" },
    { id: "5572", date: new Date("March 31 2020"), goal: "111", user: "18" },
    { id: "5573", date: new Date("March 30 2020"), goal: "111", user: "18" },
    { id: "5574", date: new Date("March 29 2020"), goal: "111", user: "18" },
    { id: "5575", date: new Date("March 29 2020"), goal: "111", user: "18" },
    { id: "5576", date: new Date("March 27 2020"), goal: "111", user: "18" },
    { id: "5577", date: new Date("March 26 2020"), goal: "112", user: "18" },
    { id: "5578", date: new Date("March 24 2020"), goal: "111", user: "18" },
    { id: "5579", date: new Date("March 24 2020"), goal: "111", user: "18" },
    { id: "5580", date: new Date("March 22 2020"), goal: "111", user: "18" },
    { id: "5581", date: new Date("March 22 2020"), goal: "111", user: "18" },
    { id: "5582", date: new Date("March 21 2020"), goal: "111", user: "18" },
    { id: "5583", date: new Date("March 19 2020"), goal: "111", user: "18" },
    { id: "5584", date: new Date("March 19 2020"), goal: "112", user: "18" },
    { id: "5585", date: new Date("March 16 2020"), goal: "111", user: "18" },
    { id: "5586", date: new Date("March 16 2020"), goal: "111", user: "18" },
    { id: "5587", date: new Date("March 16 2020"), goal: "111", user: "18" },
    { id: "5588", date: new Date("March 12 2020"), goal: "111", user: "18" },
    { id: "5589", date: new Date("March 12 2020"), goal: "111", user: "18" },
    { id: "5591", date: new Date("March 12 2020"), goal: "111", user: "18" },
    { id: "5592", date: new Date("March 11 2020"), goal: "113", user: "18" },
    { id: "5593", date: new Date("March 10 2020"), goal: "111", user: "18" },
    { id: "5594", date: new Date("March 08 2020"), goal: "112", user: "18" },
    { id: "5595", date: new Date("March 07 2020"), goal: "111", user: "18" },
    { id: "5596", date: new Date("March 07 2020"), goal: "111", user: "18" },
    { id: "5597", date: new Date("March 05 2020"), goal: "111", user: "18" },
    { id: "5598", date: new Date("March 05 2020"), goal: "112", user: "18" },
  ],
  goals: [
    { id: "111", createdAt: new Date("March 05 2020"), updatedAt: new Date("June 05 2020") },
    { id: "112", createdAt: new Date("March 05 2020"), updatedAt: new Date("June 04 2020") },
    { id: "113", createdAt: new Date("March 05 2020"), updatedAt: new Date("June 03 2020") },
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
