-- Add DELETE policy for profiles table
-- Allow users to delete only their own profile
CREATE POLICY "Users can delete their own profile" 
ON public.profiles 
FOR DELETE 
TO authenticated
USING (auth.uid() = id);