'use client';

import { usePackFitStore } from '@/lib/store';
import { generateHeuristics } from '@/lib/heuristics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Activity, LayoutTemplate, Briefcase, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { ExportButton } from '@/components/export-button';

export default function DashboardPage() {
  const { profile, savedPlans, activePlanId } = usePackFitStore();

  const activePlan = savedPlans.find(p => p.id === activePlanId);
  const heuristics = activePlan ? generateHeuristics(activePlan) : { nudges: [], efficiencyScore: 0 };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 space-y-12">

      {/* Header & Stats */}
      <section className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-brand-navy tracking-tight">Your Packing Workspace</h1>
          <p className="text-lg text-muted-foreground mt-2">Manage your trips, view progress, and optimize your load.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-brand-beige shadow-sm bg-brand-sand/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Activity className="h-4 w-4 text-brand-orange" /> Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brand-navy">{profile.currentStreak} Trips</div>
              <p className="text-xs text-muted-foreground mt-1">Consecutive trips completely packed</p>
            </CardContent>
          </Card>

          <Card className="border-brand-beige shadow-sm bg-brand-sand/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-olive" /> Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brand-navy">{profile.tripsCompleted}</div>
              <p className="text-xs text-muted-foreground mt-1">Total trips finished</p>
            </CardContent>
          </Card>

          <Card className="border-brand-beige shadow-sm bg-brand-sand/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Activity className="h-4 w-4 text-brand-navy" /> Avg Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brand-navy">{profile.averageEfficiencyScore}%</div>
              <p className="text-xs text-muted-foreground mt-1">Based on essential item tracking</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Main Content: Active Trip & AI Coach */}
        <div className="md:col-span-2 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-brand-navy">Active Trip</h2>
              <Link href="/templates">
                <Button variant="outline" size="sm" className="rounded-full">
                   <PlusCircle className="mr-2 h-4 w-4" /> New Plan
                </Button>
              </Link>
            </div>

            {activePlan ? (
              <Card className="border-brand-beige shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{activePlan.title}</CardTitle>
                      <CardDescription className="capitalize mt-1">Scenario: {activePlan.scenario.replace('-', ' ')}</CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                       <ExportButton planId={activePlan.id} planTitle={activePlan.title} />
                       <div className="text-right mt-2">
                         <div className="text-2xl font-bold text-brand-navy">{activePlan.progress}%</div>
                         <div className="text-xs text-muted-foreground">Packed</div>
                       </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Visual Progress Ring / Bar */}
                  <div className="w-full bg-brand-sand rounded-full h-3 mb-6 overflow-hidden">
                    <div
                      className="bg-brand-orange h-3 rounded-full transition-all duration-500 ease-in-out"
                      style={{ width: `${activePlan.progress}%` }}
                    ></div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Button className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white">
                      Continue Packing <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center p-12 border-2 border-dashed border-brand-beige rounded-2xl bg-brand-sand/5">
                <Briefcase className="h-12 w-12 text-brand-navy/20 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-brand-navy">No active trip plan</h3>
                <p className="text-muted-foreground mt-2 mb-6">Start by creating a new plan from a scenario template.</p>
                <Link href="/templates">
                  <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full">
                    Browse Templates
                  </Button>
                </Link>
              </div>
            )}
          </section>

          {/* AI Coach Nudges */}
          {activePlan && heuristics.nudges.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-brand-navy mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-brand-olive" /> PackFit Coach Insights
              </h3>
              <div className="space-y-3">
                {heuristics.nudges.map((nudge, i) => (
                  <div key={i} className="p-4 bg-brand-olive/10 border border-brand-olive/20 rounded-xl text-sm text-brand-navy flex gap-3">
                     <Activity className="h-5 w-5 text-brand-olive shrink-0" />
                     <p>{nudge}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar: Scenarios & Recent */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-brand-navy mb-4">Quick Scenarios</h2>
            <div className="space-y-3">
              <Link href="/templates/weekend-packing-checklist" className="block p-4 rounded-xl border border-brand-beige hover:border-brand-orange/50 hover:bg-brand-sand/10 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-orange/10 p-2 rounded-lg text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors">
                    <LayoutTemplate className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium text-brand-navy text-sm">Weekend Getaway</div>
                    <div className="text-xs text-muted-foreground">3 Days • Carry-on</div>
                  </div>
                </div>
              </Link>
              <Link href="/templates/digital-nomad-tech-setup" className="block p-4 rounded-xl border border-brand-beige hover:border-brand-olive/50 hover:bg-brand-sand/10 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-olive/10 p-2 rounded-lg text-brand-olive group-hover:bg-brand-olive group-hover:text-white transition-colors">
                    <LayoutTemplate className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium text-brand-navy text-sm">Digital Nomad</div>
                    <div className="text-xs text-muted-foreground">1+ Month • Tech Heavy</div>
                  </div>
                </div>
              </Link>
              <Link href="/templates/europe-backpacking-guide" className="block p-4 rounded-xl border border-brand-beige hover:border-brand-navy/50 hover:bg-brand-sand/10 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-navy/10 p-2 rounded-lg text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-colors">
                    <LayoutTemplate className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium text-brand-navy text-sm">Europe Backpacking</div>
                    <div className="text-xs text-muted-foreground">2 Weeks • Ultralight</div>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          <section>
             <h2 className="text-xl font-semibold text-brand-navy mb-4">Recent Plans</h2>
             {savedPlans.length === 0 ? (
               <p className="text-sm text-muted-foreground">No recent plans found.</p>
             ) : (
               <div className="space-y-3">
                 {savedPlans.filter(p => p.id !== activePlanId).slice(0, 3).map(plan => (
                    <div key={plan.id} className="flex items-center justify-between p-3 border-b border-brand-beige last:border-0">
                      <div className="flex items-center gap-3">
                         <FileText className="h-4 w-4 text-muted-foreground" />
                         <div>
                           <div className="text-sm font-medium text-brand-navy">{plan.title}</div>
                           <div className="text-xs text-muted-foreground">{plan.progress}% packed</div>
                         </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                 ))}
               </div>
             )}
          </section>
        </div>
      </div>
    </div>
  );
}
