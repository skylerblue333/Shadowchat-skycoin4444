// AUTO-GENERATED DRAFT SCREEN: ReviewsRatingsScreen
import React, { useState } from 'react';
import { trpc } from './utils/trpc';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// shadcn/ui components
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Label } from './components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Separator } from './components/ui/separator';
import { Star } from 'lucide-react';

// Define Zod schema for review form validation
const reviewSchema = z.object({
  productId: z.string().min(1, { message: 'Product ID is required.' }),
  rating: z.number().min(1).max(5, { message: 'Rating must be between 1 and 5.' }),
  comment: z.string().min(1, { message: 'Comment cannot be empty.' }).max(500, { message: 'Comment cannot exceed 500 characters.' }),
  author: z.string().min(1, { message: 'Author name is required.' }),
});

type ReviewFormInputs = z.infer<typeof reviewSchema>;

const ReviewsRatingsScreen: React.FC = () => {
  const [productId, setProductId] = useState('product1'); // Example product ID

  const { data: reviews, isLoading, isError, error, refetch } = trpc.review.list.useQuery({ productId });
  const addReviewMutation = trpc.review.add.useMutation({
    onSuccess: () => {
      alert('Review added successfully!');
      refetch(); // Refetch reviews after successful submission
      reset(); // Reset form fields
    },
    onError: (err) => {
      alert(`Error adding review: ${err.message}`);
    },
  });

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ReviewFormInputs>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      productId: productId,
      rating: 5,
      comment: '',
      author: '',
    },
  });

  const onSubmit = async (data: ReviewFormInputs) => {
    addReviewMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-gray-900 dark:text-gray-100">
      <header className="container mx-auto py-4 border-b border-border dark:border-gray-700">
        <h1 className="text-3xl font-bold">Marketplace: Reviews & Ratings</h1>
      </header>
      <main className="container mx-auto py-8 px-4">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Product Reviews</h2>
          {isLoading && <p>Loading reviews...</p>}
          {isError && <p className="text-red-500">Error: {error?.message}</p>}
          {reviews && reviews.length > 0 ? (
            <div className="grid gap-4">
              {reviews.map((review) => (
                <Card key={review.id} className="dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-medium">{review.author}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground dark:text-gray-300">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            !isLoading && !isError && <p className="text-muted-foreground dark:text-gray-400">No reviews yet. Be the first to review!</p>
          )}
        </section>

        <Separator className="my-8 dark:bg-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-4">Submit Your Review</h2>
          <Card className="dark:bg-gray-800">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="productId">Product ID</Label>
                  <Input
                    id="productId"
                    {...register("productId")}
                    value={productId} // Pre-fill with example product ID
                    onChange={(e) => setProductId(e.target.value)}
                    className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                  />
                  {errors.productId && <p className="text-red-500 text-sm">{errors.productId.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    {...register("rating", { valueAsNumber: true })}
                    min={1}
                    max={5}
                    className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                  />
                  {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="comment">Comment</Label>
                  <Textarea
                    id="comment"
                    {...register("comment")}
                    rows={4}
                    className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                  />
                  {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="author">Your Name</Label>
                  <Input
                    id="author"
                    {...register("author")}
                    className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                  />
                  {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
                </div>
                <Button type="submit" disabled={isSubmitting || addReviewMutation.isLoading} className="dark:bg-blue-600 dark:hover:bg-blue-700">
                  {isSubmitting || addReviewMutation.isLoading ? 'Submitting...' : 'Submit Review'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default ReviewsRatingsScreen;