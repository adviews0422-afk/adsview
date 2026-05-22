import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(1, {
    message: 'Password is  Required',
  }),
})

export const ConversionSchema = z.object({
  coins: z.coerce.number().min(1, { message: 'Coins is required' }),
  convertion: z.coerce.number().min(1, { message: 'Conversion is required' }),
  manual: z.boolean().default(false),
})

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: 'Full Name is required' }),
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(1, {
    message: 'Password is  Required',
  }),
})
export const ProfileUpdateSchema = z.object({
  name: z.string().min(1, { message: 'Full Name is required' }),
})
export const PasswordUpdateSchema = z.object({
  oldPassword: z.string().min(1, { message: 'Old Password is required' }),
  newPassword: z.string().min(1, { message: 'New Password is required' }),
  confirmPassword: z.string().min(1, { message: 'New Password is required' }),
})

export const ProductSchema = z.object({
  _id: z.string().optional(),
  images: z.array(z.string()).min(1, { message: 'Images are required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  productName: z.string().min(1, { message: 'Product name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  price: z.coerce.number().min(1, { message: 'Old Password is required' }),
  cost: z.coerce.number().min(1, { message: 'Cost is required' }),
  quantity: z.coerce.number().min(1, { message: 'Quantity is required' }),
  status: z.string().min(1, { message: 'Status is required' }),
})
export const AddressSchema = z.object({
  _id: z.string().min(1, { message: 'Quantity is required' }),
  country: z.coerce.number().min(1, { message: 'Quantity is required' }),
  province: z.coerce.number().min(1, { message: 'Quantity is required' }),
  city: z.coerce.number().min(1, { message: 'Quantity is required' }),
  barangay: z.coerce.number().min(1, { message: 'Quantity is required' }),
  address: z.string().min(1, { message: 'Old Password is required' }),
  zipCode: z.string().min(1, { message: 'Old Password is required' }),
})

export const ImageSchema = z.object({
  image: z.array(z.string()).min(1, { message: 'Images are required' }),
})
