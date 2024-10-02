import { NextResponse } from "next/server";
import db from "@/lib/db";
import { Job } from "@/types";
import { faker } from "@faker-js/faker";

export async function GET() {
  const DATA_SOUCE = process.env.NEXT_PUBLIC_DATA_SOURCE;
  console.log("DATA_SOURCE", DATA_SOUCE);

  if (DATA_SOUCE == "db") // fetch data from db
  {
    const jobs = db.prepare("SELECT * from jobs").all();
    return NextResponse.json(jobs);
  } else { // fetch data from fake.js
    const jobs: Job[] = [];
    const jobCount = Math.floor(Math.random() * 2) + 3; // Random number between 3 and 5
  
    for (let i = 0; i < jobCount; i++) {
      const job: Job = {
        id: i + 1, // Simple incrementing ID
        title: faker.name.jobTitle(),
        description: faker.lorem.paragraph(),
        salary: Math.floor(Math.random() * 40) + 10, // Random salary between 10 and 50
      };
      jobs.push(job);
    }
  
    return NextResponse.json(jobs);
  }
}
