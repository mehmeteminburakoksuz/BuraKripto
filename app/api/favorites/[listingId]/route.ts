import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse} from "next/server";


interface IParams{
    listingId?: string;
}

export async function POST()