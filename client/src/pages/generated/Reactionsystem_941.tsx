// AUTO-GENERATED DRAFT SCREEN: ReactionSystem
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { trpc } from './trpc';

const ReactionSystem: React.FC = () => {
  const postId = "123"; // Example postId
  const [newComment, setNewComment] = useState("");

  const { data, isLoading, isError, error, refetch } = trpc.getReactions.useQuery({ postId });
  const addReactionMutation = trpc.addReaction.useMutation({
    onSuccess: () => {
      refetch();
    },
  });
  const addCommentMutation = trpc.addComment.useMutation({
    onSuccess: () => {
      setNewComment("");
      refetch();
    },
  });

  const handleAddReaction = (reactionType: string) => {
    addReactionMutation.mutate({ postId, reactionType });
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    addCommentMutation.mutate({ postId, user: "CurrentUser", text: newComment });
  };

  if (isLoading) {
    return <div className="container mx-auto p-4">Loading reactions...</div>;
  }

  if (isError) {
    return <div className="container mx-auto p-4 text-red-500">Error: {error?.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Reaction System</h1>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Post Title</CardTitle>
          <CardDescription>This is a sample post content.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Button variant="outline" onClick={() => handleAddReaction("like")}>👍 Like ({data?.likes || 0})</Button>
            <Button variant="outline" onClick={() => handleAddReaction("love")}>❤️ Love ({data?.loves || 0})</Button>
            <Button variant="outline" onClick={() => handleAddReaction("haha")}>😂 Haha ({data?.hahas || 0})</Button>
            <Button variant="outline" onClick={() => handleAddReaction("sad")}>😢 Sad ({data?.sads || 0})</Button>
            <Button variant="outline" onClick={() => handleAddReaction("angry")}>😡 Angry ({data?.angrys || 0})</Button>
          </div>
          <div className="comments-section">
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            <div className="space-y-2">
              {data?.comments.map((comment) => (
                <div key={comment.id} className="bg-muted p-2 rounded-md">
                  <p className="text-sm font-medium">{comment.user}: {comment.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex space-x-2">
              <Input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button onClick={handleAddComment} disabled={addCommentMutation.isPending}>Comment</Button>
            </div>
            {addCommentMutation.isPending && <p className="text-sm text-muted-foreground mt-2">Adding comment...</p>}
            {addCommentMutation.isError && <p className="text-sm text-red-500 mt-2">Error adding comment: {addCommentMutation.error?.message}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">{data?.likes || 0} Likes, {data?.comments.length || 0} Comments</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ReactionSystem;
