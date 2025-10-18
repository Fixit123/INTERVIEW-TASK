'use client';

/**
 * Messages Application - Main Page Component
 * 
 * Features:
 * - Complete CRUD operations for messages
 * - Real-time updates with RTK Query
 * - Professional UI with ShadCN components
 * - Form validation and error handling
 * - Responsive design
 */

import { useState } from 'react';
import { useGetMessagesQuery, useCreateMessageMutation, useUpdateMessageMutation, useDeleteMessageMutation } from '../lib/store/api';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Message } from '../lib/store/api';

export default function Home() {
  const [newMessage, setNewMessage] = useState('');
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [editContent, setEditContent] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // RTK Query hooks
  const { data: messages = [], isLoading, error } = useGetMessagesQuery();
  const [createMessage, { isLoading: isCreating }] = useCreateMessageMutation();
  const [updateMessage, { isLoading: isUpdating }] = useUpdateMessageMutation();
  const [deleteMessage, { isLoading: isDeleting }] = useDeleteMessageMutation();

  const handleCreateMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await createMessage({ content: newMessage.trim() }).unwrap();
      setNewMessage('');
    } catch (error) {
      console.error('Failed to create message:', error);
    }
  };

  const handleEditMessage = (message: Message) => {
    setEditingMessage(message);
    setEditContent(message.content);
    setIsEditDialogOpen(true);
  };

  const handleUpdateMessage = async () => {
    if (!editingMessage || !editContent.trim()) return;

    try {
      await updateMessage({ 
        id: editingMessage.id, 
        content: editContent.trim() 
      }).unwrap();
      setIsEditDialogOpen(false);
      setEditingMessage(null);
      setEditContent('');
    } catch (error) {
      console.error('Failed to update message:', error);
    }
  };

  const handleDeleteMessage = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteMessage(id).unwrap();
      } catch (error) {
        console.error('Failed to delete message:', error);
      }
    }
  };

  if (isLoading) return <div className="p-8">Loading messages...</div>;
  if (error) return <div className="p-8 text-red-500">Error loading messages</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Messages Application</h1>
        
        {/* Create Message Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Message</h2>
          <form onSubmit={handleCreateMessage} className="space-y-4">
            <div>
              <Label htmlFor="message">Message Content</Label>
              <Textarea
                id="message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Enter your message here..."
                className="mt-1"
                rows={3}
              />
            </div>
            <Button type="submit" disabled={isCreating || !newMessage.trim()}>
              {isCreating ? 'Creating...' : 'Create Message'}
            </Button>
          </form>
        </div>

        {/* Messages Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Messages ({messages.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell className="font-medium">{message.id}</TableCell>
                    <TableCell className="max-w-md">
                      <div className="whitespace-pre-wrap break-words">
                        {message.content}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(message.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditMessage(message)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteMessage(message.id)}
                          disabled={isDeleting}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Edit Message Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Message</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-message">Message Content</Label>
                <Textarea
                  id="edit-message"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateMessage}
                  disabled={isUpdating || !editContent.trim()}
                >
                  {isUpdating ? 'Updating...' : 'Update Message'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
