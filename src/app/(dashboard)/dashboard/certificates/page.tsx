"use client";

import { useState, useEffect } from "react";
import { Award, Download, ExternalLink, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { formatDate } from "@/utils";
import { certificatesApi, Certificate } from "@/services/api";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    certificatesApi
      .getAll()
      .then((res) => {
        if (res.success) {
          setCertificates(res.data || []);
        }
      })
      .catch(() => {
        setCertificates([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Certificates</h1>
          <p className="text-muted-foreground mt-1">Loading...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Certificates</h1>
        <p className="text-muted-foreground mt-1">
          {certificates.length} certificate{certificates.length !== 1 ? "s" : ""} earned
        </p>
      </div>

      {certificates.length === 0 ? (
        <FadeIn>
          <Card>
            <CardContent className="p-12 text-center">
              <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">No Certificates Yet</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Complete a course to earn your first certificate. Keep learning and growing!
              </p>
            </CardContent>
          </Card>
        </FadeIn>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert, i) => (
            <FadeIn key={cert._id} delay={i * 0.1}>
              <Card className="hover:shadow-lg transition-all">
                <div className="relative h-40 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-t-xl flex items-center justify-center">
                  <div className="text-center">
                    <Award className="h-12 w-12 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium text-primary">Certificate of Completion</p>
                    <p className="text-xs text-muted-foreground mt-1">{cert.certificateNumber}</p>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground mb-1">{cert.courseName}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Completed on {formatDate(cert.completionDate)}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Student: {cert.studentName}
                  </p>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    {cert.pdfUrl && (
                      <>
                        <a
                          href={cert.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </a>
                        <a
                          href={cert.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View
                        </a>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
