import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  // Parse the request body
  const { title, description, salary } = await req.json();

  // Validate the input
  if (!title || !description || typeof salary !== "number") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // Update the job in the database
  const updateJob = db.prepare('UPDATE jobs SET title = ?, description = ?, salary = ? WHERE id = ?');
  const result = updateJob.run(title, description, salary, id);

  if (result.changes > 0) {
    // Query the updated job data
    const updatedJobQuery = db.prepare('SELECT * FROM jobs WHERE id = ?');
    const updatedJob = updatedJobQuery.get(id);
    
    // Return the updated job data
    return NextResponse.json({ message: 'Job updated successfully', data: updatedJob });
  } else {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }
}