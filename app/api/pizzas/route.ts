import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"


export async function POST(request: NextRequest) {

    
    const { name, description } = await request.json()
    // const { name, description } = {name: "piz3", description: "not hot"}
    console.log(`name is ${name} and description is ${description}`)    

    try {
        const pizza = await prisma.pizza.create({
            data: {
                name: name,
                description: description
              },
        })

        const responseBody = {
            message: "You created new pizza in db:",
            pizza: pizza
        }

        return NextResponse.json(responseBody, {"status": 200})
    } catch (error) {
        return NextResponse.json({message: "Something went wrong in the databse. Maybe pizza name is already used, or databse is down."}, {"status": 503})
    }
    

    
}


export function GET() {
    return NextResponse.json({message: "You Tried To get All pizzas from db"}, {"status": 200})
}