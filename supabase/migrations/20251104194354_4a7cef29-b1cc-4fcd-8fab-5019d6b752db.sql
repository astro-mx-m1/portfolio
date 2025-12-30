-- Add INSERT/UPDATE/DELETE policies for user_roles table to allow admins to manage roles

-- Allow admins to assign new roles to users
CREATE POLICY "Admins can assign roles" 
ON public.user_roles
FOR INSERT 
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to modify existing roles
CREATE POLICY "Admins can modify roles" 
ON public.user_roles
FOR UPDATE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to remove roles from users
CREATE POLICY "Admins can remove roles" 
ON public.user_roles
FOR DELETE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));