"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Search,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function CounsellorsAdminPage() {

  const [counsellors, setCounsellors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const [tab, setTab] = useState("all");

  const [stats, setStats] = useState({
    totalCounsellors: 0,
    pending: 0,
    verified: 0,
  });

  const fetchCounsellors = async () => {
    try {

      const res = await fetch(
        `/api/admin/counsellors?page=${page}&search=${searchQuery}&status=${tab}`
      );

      const data = await res.json();

      setCounsellors(data.counsellors);
      setTotalPages(data.pagination.pages);
      setStats(data.stats);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchCounsellors();

  }, [page, searchQuery, tab]);

  const approveCounsellor = async (id: string) => {

    await fetch("/api/admin/counsellors/approve", {
      method: "PATCH",
      body: JSON.stringify({ id }),
    });

    fetchCounsellors();

  };

  const rejectCounsellor = async (id: string) => {

    await fetch("/api/admin/counsellors/reject", {
      method: "PATCH",
      body: JSON.stringify({ id }),
    });

    fetchCounsellors();

  };

  if (loading) {
    return <div className="p-6">Loading counsellors...</div>;
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div>
        <h1 className="text-2xl font-semibold">
          Career Counsellors
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage counsellor approvals
        </p>
      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-4">

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Total Counsellors
            </p>

            <p className="text-2xl font-semibold">
              {stats.totalCounsellors}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Pending
            </p>

            <p className="text-2xl font-semibold">
              {stats.pending}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Verified
            </p>

            <p className="text-2xl font-semibold">
              {stats.verified}
            </p>
          </CardContent>
        </Card>

      </div>

      {/* FILTERS */}

      <div className="flex justify-between items-center">

        <Tabs
          defaultValue="all"
          onValueChange={(value) => {
            setTab(value);
            setPage(1);
          }}
        >
          <TabsList>

            <TabsTrigger value="all">
              All
            </TabsTrigger>

            <TabsTrigger value="pending">
              Pending
            </TabsTrigger>

            <TabsTrigger value="verified">
              Verified
            </TabsTrigger>

          </TabsList>
        </Tabs>

        <div className="relative w-64">

          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search counsellor..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
          />

        </div>

      </div>

      {/* TABLE */}

      <Card>

        <CardContent className="p-0">

          <table className="w-full text-sm">

            <thead className="border-b bg-muted/50">

              <tr className="text-left">

                <th className="p-4">Counsellor</th>

                <th className="p-4">Specialization</th>

                <th className="p-4">Experience</th>

                <th className="p-4">Status</th>

                <th className="p-4 text-right">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {counsellors.map((c) => (

                <tr key={c._id} className="border-b">

                  <td className="p-4">

                    <div>

                      <p className="font-medium">
                        {c.firstName} {c.lastName}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {c.email}
                      </p>

                    </div>

                  </td>

                  <td className="p-4">

                    {c.specialization ? (
                      <Badge variant="secondary">
                        {c.specialization}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-xs">
                        —
                      </span>
                    )}

                  </td>

                  <td className="p-4">
                    {c.experience || 0} yrs
                  </td>

                  <td className="p-4">

                    <Badge>
                      {c.status}
                    </Badge>

                  </td>

                  <td className="p-4 text-right">

                    {/* {c.status != "verified" && ( */}

                      <div className="flex justify-end gap-2">

                        <Button
                          size="sm"
                          onClick={() =>
                            approveCounsellor(c._id)
                          }
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Approve
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            rejectCounsellor(c._id)
                          }
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>

                      </div>

                    {/* // )} */}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </CardContent>

      </Card>

      {/* PAGINATION */}

      <div className="flex justify-center gap-3">

        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </Button>

        <span className="text-sm">
          Page {page} / {totalPages}
        </span>

        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>

      </div>

    </div>
  );
}