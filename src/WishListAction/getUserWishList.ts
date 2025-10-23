'use server';

import { cookies } from 'next/headers';

export async function getUserWishListAction() {
    const cookieStore = await cookies();
    const token = cookieStore.get("userToken")?.value;

    if (!token) {
        throw new Error('login first');
    }

    const response = await fetch(
        'https://ecommerce.routemisr.com/api/v1/wishlist',
    {
    headers: {
        Authorization: `Bearer ${token}`, 
    },
        cache: 'no-store', 
    }
    );

    if (!response.ok) {
        throw new Error('Failed to fetch wishlist');
    }

    const data = await response.json();
    return data;
}
