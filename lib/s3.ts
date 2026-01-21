import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/* -------------------------------------------------------------------------- */
/*                                   CONFIG                                   */
/* -------------------------------------------------------------------------- */

const REGION = process.env.AWS_REGION ?? "ap-southeast-1";
const BUCKET = process.env.AWS_BUCKET_NAME ?? "";
export const CLOUDFRONT_DOMAIN = process.env.CLOUDFRONT_DOMAIN ?? "";

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
});

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const extractKey = (urlOrKey: any): string => {
  if (!urlOrKey) return "";
  if (typeof urlOrKey !== "string") return String(urlOrKey);
  if (!urlOrKey.startsWith("http")) return urlOrKey;

  try {
    return new URL(urlOrKey).pathname.slice(1);
  } catch {
    return urlOrKey;
  }
};

export const toCloudFrontUrl = (urlOrKey?: string | null): string => {
  if (!urlOrKey) return "";

  // If already CloudFront, return as is
  if (urlOrKey.includes("cloudfront.net")) return urlOrKey;

  // If it's an http/https URL
  if (urlOrKey.startsWith("http")) {
    if (!urlOrKey.includes("amazonaws.com")) {
      return urlOrKey;
    }
  }

  // It is either a key or an S3 URL we want to transform
  const key = extractKey(urlOrKey);

  // Ensure protocol
  const domain = CLOUDFRONT_DOMAIN.startsWith("http")
    ? CLOUDFRONT_DOMAIN
    : `https://${CLOUDFRONT_DOMAIN}`;

  return `${domain}/${key}`;
};

/* -------------------------------------------------------------------------- */
/*                                   S3 APIs                                  */
/* -------------------------------------------------------------------------- */

export async function uploadFile(
  buffer: Buffer,
  key: string,
  contentType: string,
): Promise<string> {
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    }),
  );

  // luôn trả về CloudFront URL
  return toCloudFrontUrl(key);
}

export async function deleteFile(urlOrKey: string): Promise<void> {
  const key = extractKey(urlOrKey);

  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: key,
      }),
    );
  } catch (err) {
    console.error("Delete S3 failed:", err);
  }
}

export async function getPresignedUrl(
  key: string,
  expiresIn = 3600,
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });

  return getSignedUrl(s3, command, { expiresIn });
}
