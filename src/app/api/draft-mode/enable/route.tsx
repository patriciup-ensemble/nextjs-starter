import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  handleUnexpectedError,
  invalidRequestResponse,
  isRelativeUrl,
  makeDraftModeWorkWithinIframes,
} from '../../utils';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  const url = request.nextUrl.searchParams.get('url') || '/';

  try {
    if (token !== process.env.SECRET_API_TOKEN) {
      return invalidRequestResponse('Invalid token', 401);
    }

    if (!isRelativeUrl(url)) {
      return invalidRequestResponse('URL must be relative!', 422);
    }

    draftMode().enable();
    makeDraftModeWorkWithinIframes();

    return NextResponse.redirect(new URL(url, request.url));
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
