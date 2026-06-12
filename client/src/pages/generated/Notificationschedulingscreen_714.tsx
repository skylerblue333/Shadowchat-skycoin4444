// AUTO-GENERATED DRAFT SCREEN: NotificationSchedulingScreen
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, Trash2, AlertCircle, Loader2, BellRing } from 'lucide-react';

// Assuming tRPC is set up in the project
import { trpc } from '@/utils/trpc';

// shadcn/ui components (mock imports for the environment)
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const scheduleSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  audience: z.enum(['ALL', 'ACTIVE', 'INACTIVE']),
  scheduledAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
});

type ScheduleFormValues = z.infer<typeof scheduleSchema>;

export default function NotificationSchedulingScreen() {
  const { toast } = useToast();
  const utils = trpc.useUtils();

  const { 
    data: scheduledNotifications, 
    isLoading: isLoadingNotifications, 
    error: fetchError 
  } = trpc.notifications.getScheduled.useQuery();
  
  const scheduleMutation = trpc.notifications.schedule.useMutation({
    onSuccess: () => {
      toast({ title: 'Success', description: 'Notification scheduled successfully.' });
      utils.notifications.getScheduled.invalidate();
      reset();
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  });

  const cancelMutation = trpc.notifications.cancel.useMutation({
    onSuccess: () => {
      toast({ title: 'Cancelled', description: 'Scheduled notification cancelled.' });
      utils.notifications.getScheduled.invalidate();
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  });

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      title: '',
      message: '',
      audience: 'ALL',
      scheduledAt: '',
    }
  });

  const onSubmit = (data: ScheduleFormValues) => {
    scheduleMutation.mutate({
      ...data,
      scheduledAt: new Date(data.scheduledAt).toISOString(),
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl space-y-8 dark:bg-slate-950 dark:text-slate-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <BellRing className="h-8 w-8 text-primary" />
            Notification Scheduling
          </h1>
          <p className="text-muted-foreground mt-2">
            Schedule and manage upcoming push notifications for SKYCOIN4444 users.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Scheduling Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Schedule New</CardTitle>
            <CardDescription>Create a new scheduled notification.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Input 
                  id="title" 
                  placeholder="e.g., System Maintenance" 
                  {...register('title')} 
                  aria-invalid={!!errors.title} 
                />
                {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea 
                  id="message" 
                  placeholder="Notification content..." 
                  rows={4} 
                  {...register('message')} 
                  aria-invalid={!!errors.message} 
                />
                {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="audience" className="text-sm font-medium">Target Audience</label>
                <Controller
                  name="audience"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger id="audience">
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ALL">All Users</SelectItem>
                        <SelectItem value="ACTIVE">Active Users (30d)</SelectItem>
                        <SelectItem value="INACTIVE">Inactive Users</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.audience && <p className="text-sm text-destructive">{errors.audience.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="scheduledAt" className="text-sm font-medium">Schedule Date & Time</label>
                <Input 
                  id="scheduledAt" 
                  type="datetime-local" 
                  {...register('scheduledAt')} 
                  aria-invalid={!!errors.scheduledAt} 
                />
                {errors.scheduledAt && <p className="text-sm text-destructive">{errors.scheduledAt.message}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={scheduleMutation.isPending}>
                {scheduleMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CalendarIcon className="mr-2 h-4 w-4" />
                )}
                {scheduleMutation.isPending ? 'Scheduling...' : 'Schedule Notification'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Scheduled List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Notifications</CardTitle>
            <CardDescription>View and manage your scheduled notifications.</CardDescription>
          </CardHeader>
          <CardContent>
            {fetchError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Failed to load scheduled notifications. Please try again.</AlertDescription>
              </Alert>
            )}

            {isLoadingNotifications ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
              </div>
            ) : scheduledNotifications?.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                <Clock className="mx-auto h-12 w-12 mb-4 opacity-20" />
                <p>No upcoming notifications scheduled.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {scheduledNotifications?.map((notification) => (
                  <div 
                    key={notification.id} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors"
                  >
                    <div className="space-y-1 mb-4 sm:mb-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{notification.title}</h4>
                        <Badge variant={notification.audience === 'ALL' ? 'default' : 'secondary'}>
                          {notification.audience}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">{notification.message}</p>
                      <div className="flex items-center text-xs text-muted-foreground gap-1 mt-2">
                        <CalendarIcon className="h-3 w-3" />
                        {format(new Date(notification.scheduledAt), 'PPp')}
                      </div>
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => cancelMutation.mutate({ id: notification.id })}
                      disabled={cancelMutation.isPending}
                      aria-label={`Cancel notification ${notification.title}`}
                    >
                      {cancelMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4 mr-2" />
                      )}
                      Cancel
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}