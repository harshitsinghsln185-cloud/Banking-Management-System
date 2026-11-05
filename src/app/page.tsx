import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Amount } from "@/components/ui/amount";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12 w-full">
      {/* Brand Header */}
      <header className="border-b border-border/40 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">
            Design System Preview
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-1">
            Aurelia Bank
          </h1>
          <p className="text-muted text-sm sm:text-base mt-1">
            Emerald Trust design tokens, typography, and reusable components.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success">System Online</Badge>
          <Badge variant="neutral">Dark Theme Only</Badge>
        </div>
      </header>

      {/* Typography Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Typography (Sora & Manrope)</h2>
        <Card className="space-y-4">
          <div>
            <span className="text-xs text-muted block mb-1">Heading 1 (Sora)</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
              Institutional Security, Retail Simplicity
            </h1>
          </div>
          <div>
            <span className="text-xs text-muted block mb-1">Heading 2 (Sora)</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Account Overview & Wealth Management
            </h2>
          </div>
          <div>
            <span className="text-xs text-muted block mb-1">Heading 3 (Sora)</span>
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground">
              Fixed Deposits and High-Yield Savings
            </h3>
          </div>
          <div>
            <span className="text-xs text-muted block mb-1">Heading 4 (Sora)</span>
            <h4 className="text-lg font-medium text-foreground">
              Recent Transactions & Real-time Audit Logs
            </h4>
          </div>
          <div className="pt-2 border-t border-border">
            <span className="text-xs text-muted block mb-1">Body Text (Manrope)</span>
            <p className="text-base text-foreground/90 leading-relaxed">
              Every balance movement is backed by MongoDB session transactions with idempotency
              keys. Money is strictly maintained in integer paise without floating point rounding
              errors, ensuring verifiable audit trails for enterprise compliance.
            </p>
          </div>
        </Card>
      </section>

      {/* Badges and Amount Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Status Badges & Currency</h2>
        <Card className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <span className="text-xs text-muted block uppercase tracking-wider font-semibold">
              Badge Variants
            </span>
            <div className="flex flex-wrap gap-2.5">
              <Badge variant="success">Success / Verified</Badge>
              <Badge variant="warning">Pending Review</Badge>
              <Badge variant="danger">Fraud Flagged</Badge>
              <Badge variant="neutral">Draft Status</Badge>
            </div>
          </div>

          <div className="space-y-2 rounded-xl bg-surface2/60 p-4 border border-border">
            <span className="text-xs text-muted block uppercase tracking-wider font-semibold">
              Total Portfolio Balance (48,235,000 paise)
            </span>
            <div className="flex items-baseline gap-2">
              <Amount
                paise={48235000}
                className="text-3xl sm:text-4xl font-extrabold text-foreground"
              />
            </div>
            <p className="text-xs text-muted">
              Rendered via <code className="text-accent">formatINR(48235000)</code> with tabular
              numerals.
            </p>
          </div>
        </Card>
      </section>

      {/* Button Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Button Component Variants</h2>
        <Card className="space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Primary Gradient</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="danger">Danger Action</Button>
            <Button variant="primary" loading>
              Processing
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
          <p className="text-xs text-muted">
            Pill radius (<code className="text-accent">rounded-full</code>), 135° emerald gradient,
            hover lift translation, and loading state.
          </p>
        </Card>
      </section>

      {/* Form Field with Error */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Form Validation & Inputs</h2>
        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>Fund Transfer Request</CardTitle>
            <CardDescription>
              Simulate an account debit with instantaneous validation feedback.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              id="account-number"
              label="Recipient Account Number"
              hint="Enter standard 12-digit Aurelia account ID"
              required
            >
              <Input
                id="account-number"
                placeholder="e.g. 100234567890"
                defaultValue="100234567890"
              />
            </FormField>

            <FormField
              id="transfer-amount"
              label="Transfer Amount (INR)"
              required
              error="Amount exceeds your single transaction limit of ₹50,000.00"
            >
              <Input id="transfer-amount" hasError placeholder="₹ 0.00" defaultValue="75000.00" />
            </FormField>

            <div className="pt-2">
              <Button variant="primary" className="w-full sm:w-auto">
                Authorize Transfer
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
