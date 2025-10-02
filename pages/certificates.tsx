import MetaData from "@components/MetaData";
import { popUpFromBottomForText } from "@content/FramerMotionVariants";
import Image from "next/image";
import Link from "next/link";
import AnimatedDiv from "@components/FramerMotion/AnimatedDiv";
import PageTop from "@components/PageTop";
import pageMeta from "@content/meta";
import { CertificateType } from "@lib/types";
import CreateAnIssue from "@components/CreateAnIssue";
import { getFormattedDate } from "@utils/date";
import fs from "fs";
import path from "path";

export default function Certificates({
  certificates,
  error,
}: {
  certificates: CertificateType[];
  error: boolean;
}) {
  if (error) return <CreateAnIssue />;

  return (
    <>
      <MetaData
        title={pageMeta.certificates.title}
        description={pageMeta.certificates.description}
        previewImage={pageMeta.certificates.image}
        keywords={pageMeta.certificates.keywords}
      />

      <section className="pageTop">
        <PageTop pageTitle="Certificates">
          I've participated in many contests, courses and test and get certified
          in many skills. You can find the certificates below.
        </PageTop>

        <div className="flex flex-col gap-3 font-inter">
          {certificates.map((cer) => {
            return (
              <AnimatedDiv
                className="flex flex-col gap-2 p-3 bg-white rounded-lg shadow md:flex-row md:items-center md:justify-between md:gap-4 dark:bg-darkSecondary/50"
                variants={popUpFromBottomForText}
                key={cer.id}
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    <Image
                      width={40}
                      height={40}
                      src={cer.orgLogo}
                      alt={cer.orgName}
                      quality={50}
                      placeholder="blur"
                      blurDataURL={cer.orgLogo}
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className="flex flex-col ">
                    <Link
                      href={cer.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold hover:underline sm:text-base md:text-lg text-neutral-900 dark:text-neutral-200"
                    >
                      {cer.title}
                    </Link>
                    <p className="text-xs text-gray-500">
                      {cer.orgName} &#x2022;{" "}
                      {getFormattedDate(new Date(cer.issuedDate))}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500"></p>
              </AnimatedDiv>
            );
          })}
        </div>
      </section>
    </>
  );
}

function getOrgDetails(fileName: string) {
  const lowerFileName = fileName.toLowerCase();

  // AWS Certificates
  if (lowerFileName.includes('aws') || lowerFileName.includes('amazon')) {
    return {
      orgName: 'Amazon Web Services',
      orgLogo: '/icons/aws.svg'
    };
  }
  // GitHub/Microsoft
  if (lowerFileName.includes('github') || lowerFileName.includes('copilot')) {
    return {
      orgName: 'GitHub',
      orgLogo: '/icons/github.svg'
    };
  }
  // Google/GCP
  if (lowerFileName.includes('gcp') || lowerFileName.includes('duet')) {
    return {
      orgName: 'Google Cloud',
      orgLogo: '/icons/google.svg'
    };
  }
  // Coursera
  if (lowerFileName.includes('coursera')) {
    return {
      orgName: 'Coursera',
      orgLogo: '/icons/coursera.svg'
    };
  }
  // Udemy
  if (lowerFileName.includes('udemy')) {
    return {
      orgName: 'Udemy',
      orgLogo: '/icons/udemy.svg'
    };
  }
  // Capgemini
  if (lowerFileName.includes('capgemini') || lowerFileName.includes('anniversary') ||
      lowerFileName.includes('banking') || lowerFileName.includes('kesdee') ||
      lowerFileName.includes('46201609') || lowerFileName.includes('cards') ||
      lowerFileName.includes('payments') || lowerFileName.includes('retail banking')) {
    return {
      orgName: 'Capgemini',
      orgLogo: '/icons/capgemini.svg'
    };
  }
  // Docker
  if (lowerFileName.includes('docker')) {
    return {
      orgName: 'Docker',
      orgLogo: '/icons/docker.svg'
    };
  }
  // OWASP
  if (lowerFileName.includes('owasp')) {
    return {
      orgName: 'OWASP',
      orgLogo: '/icons/security.svg'
    };
  }
  // Default
  return {
    orgName: 'Certificate Provider',
    orgLogo: '/icons/certificate.svg'
  };
}

function formatCertificateName(fileName: string): string {
  // Remove file extension
  const nameWithoutExt = fileName.replace(/\.(pdf|jpg|png|jpeg)$/i, '');

  // Remove common prefixes with IDs
  let cleanName = nameWithoutExt
    .replace(/^\d+_\d+_\d+_\d+_/g, '') // Remove numeric prefixes like 14759_3_5268813_1721697590_
    .replace(/^Certificate\s*-\s*/i, '') // Remove "Certificate -" prefix
    .replace(/^Certficate\s*-\s*/i, '') // Remove "Certficate -" prefix (typo)
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/-Ammar\.?/gi, '') // Remove -Ammar suffix
    .replace(/-\s*Capgemini/gi, '') // Remove - Capgemini suffix
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();

  return cleanName;
}

export async function getStaticProps() {
  try {
    const certificatesDir = path.join(process.cwd(), 'public', 'CG Certificates_2024');
    const files = fs.readdirSync(certificatesDir);

    const certificates: CertificateType[] = files
      .filter(file => /\.(pdf|jpg|png|jpeg)$/i.test(file))
      .map((file, index) => {
        const stats = fs.statSync(path.join(certificatesDir, file));
        const orgDetails = getOrgDetails(file);

        return {
          id: String(index + 1),
          title: formatCertificateName(file),
          url: `/CG Certificates_2024/${encodeURIComponent(file)}`,
          orgName: orgDetails.orgName,
          orgLogo: orgDetails.orgLogo,
          issuedDate: stats.mtime.toISOString(),
          pinned: true
        };
      })
      .sort((a, b) => new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime());

    return {
      props: {
        certificates,
        error: false,
      },
    };
  } catch (error) {
    console.error('Error loading certificates:', error);
    return {
      props: {
        certificates: [],
        error: true,
      },
    };
  }
}
