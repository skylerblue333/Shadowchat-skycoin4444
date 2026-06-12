// AUTO-GENERATED DRAFT SCREEN: RepayScreen
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { trpc } from '../trpc';
import { cn } from '../lib/utils';

// Assuming shadcn/ui components are available and properly configured.
// For this example, we'll use simple div/button/input elements with Tailwind classes
// to simulate shadcn/ui components. In a real project, these would be imported from your shadcn/ui setup.

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  )
);
Label.displayName = "Label";

// Mock Form components for react-hook-form integration
const Form = ({ children, ...props }: React.FormHTMLAttributes<HTMLFormElement>) => <form {...props}>{children}</form>;
const FormField = ({ name, render, control }: any) => {
  const { field, fieldState } = control.register(name);
  return render({ field: { ...field, value: control.getValues(name) }, fieldState });
};
const FormItem = ({ children }: { children: React.ReactNode }) => <div className="space-y-2">{children}</div>;
const FormLabel = Label;
const FormControl = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
const FormMessage = ({ children }: { children: React.ReactNode }) => <p className="text-red-500 text-sm mt-1">{children}</p>;

const formSchema = z.object({
  amount: z.number().min(0.01, { message: 'Amount must be positive' }),
  currency: z.string().min(1, { message: 'Currency is required' }),
});

type RepayFormValues = z.infer<typeof formSchema>;

const RepayScreen: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const form = useForm<RepayFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      currency: 'USDC',
    },
  });

  const repayMutation = trpc.repay.useMutation();

  const onSubmit = async (values: RepayFormValues) => {
    try {
      await repayMutation.mutateAsync(values);
      alert('Repayment successful!');
      form.reset();
    } catch (error: any) {
      alert(`Repayment failed: ${error.message}`);
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={cn("min-h-screen bg-background text-foreground flex items-center justify-center p-4", {
      'dark': isDarkTheme
    })}>
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Crypto: Repay Screen</h1>
          <Button onClick={toggleTheme} aria-label="Toggle theme">
            {isDarkTheme ? 'Light' : 'Dark'} Theme
          </Button>
        </div>

        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="currency"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <Input placeholder="USDC" {...field} />
                  </FormControl>
                  <FormMessage>{form.formState.errors.currency?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} onChange={(event) => field.onChange(parseFloat(event.target.value))} />
                  </FormControl>
                  <FormMessage>{form.formState.errors.amount?.message}</FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={repayMutation.isLoading}>
              {repayMutation.isLoading ? 'Repaying...' : 'Repay'}
            </Button>
            {repayMutation.isError && (
              <p className="text-red-500 text-sm text-center">Error: {repayMutation.error?.message}</p>
            )}
            {repayMutation.isSuccess && (
              <p className="text-green-500 text-sm text-center">{repayMutation.data?.message}</p>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RepayScreen;
