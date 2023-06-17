import { z } from 'zod'

export const loginUserSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Email must be a valid email.' }),
    password: z.string({ required_error: 'Password is required' })
});

export const registerUserSchema = z.object({
    name: z
        .string({ required_error: 'Name is required' })
        .regex(/^[a-zA-z\s]*$/, { message: 'Name can only contain letters and spaces.' })
        .min(2, { message: 'Name must be at least 2 characters' })
        .max(64, { message: 'Name must be less than 64 characters' })
        .trim(),
    email: z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Email must be a valid email' }),
    password: z
        .string({ message: 'Password is required' })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, { message: 'Password must be a minimum of 8 characters & contain at least 1 lowercase letter, at least 1 uppercase letter and a number' }),
    passwordConfirm: z
        .string({ message: 'Confirm Password is required' })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, { message: 'Password must be a minimum of 8 characters & contain at least 1 lowercase letter, at least 1 uppercase letter and a number' }),
}).superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password & Confirm password must match',
            path: ['password']
        })
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password & Confirm password must match',
            path: ['passwordConfirm']
        })
    }
});


const imageTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/svg+xml',
    'image/gif'
]

export const createProjectSchema = z.object({
    name: z
        .string({ required_error: 'Name is required' })
        .min(1, { message: 'Name is required' })
        .max(64, { message: 'Name must be 64 characters or less' })
        .trim(),
    tagline: z
        .string({ required_error: 'Tagline is required' })
        .min(1, { message: 'Tagline is required' })
        .max(64, { message: 'Tagline must be 64 characters or less' })
        .trim(),
    url: z.string({ required_error: 'URL is required' }).url({ message: 'URL must be a valid URL' }),
    description: z
        .string({ required_error: 'Description is required' })
        .min(1, { message: 'Description is required' })
        .max(512, { message: 'Description must be 512 characters or less' })
        .trim(),
    thumbnail: z.instanceof(Blob).optional().superRefine((val, ctx) => {
        if (val) {
            if (val.size > 5242880) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Thumbnail must be less than 5MB'
                })
            }

            if (!imageTypes.includes(val.type)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Unsupported file type. Supported formats: jpeg, jpg, png, webp, svg, gif'
                })
            }
        }
    }),
    user: z.string({ required_error: 'User is required' })
});

export const updateProjectSchema = createProjectSchema.omit({ user: true });

export const updateEmailSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Email must be a valid email' })
});

export const updateUsernameSchema = z.object({
    username: z
        .string({ required_error: 'Username is required' })
        .min(3, { message: 'Username must be atleast 3 characters' })
        .max(24, { message: 'Username must be 24 characters or less' })
        .regex(/^[a-zA-Z0-9]*$/, { message: 'Username can only contain letters or numbers.' })
});

export const updatePasswordSchema = z.object({
    oldPassword: z.string({ required_error: 'Old password is required' }),
    password: z
        .string({ message: 'Password is required' })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, { message: 'Password must be a minimum of 8 characters & contain at least 1 lowercase letter, at least 1 uppercase letter and a number' }),
    passwordConfirm: z
        .string({ message: 'Confirm Password is required' })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, { message: 'Password must be a minimum of 8 characters & contain at least 1 lowercase letter, at least 1 uppercase letter and a number' }),
}).superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password & Confirm password must match',
            path: ['password']
        })
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password & Confirm password must match',
            path: ['passwordConfirm']
        })
    }
});

export const updateProfileSchema = z.object({
    name: z
        .string({ required_error: 'Name is required' })
        .regex(/^[a-zA-z\s]*$/, { message: 'Name can only contain letters and spaces.' })
        .min(2, { message: 'Name must be at least 2 characters' })
        .max(64, { message: 'Name must be less than 64 characters' })
        .trim(),
    avatar: z.instanceof(Blob).optional().superRefine((val, ctx) => {
        if (val) {
            if (val.size > 5242880) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Avatar must be less than 5MB'
                })
            }

            if (!imageTypes.includes(val.type)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Unsupported file type. Supported formats: jpeg, jpg, png, webp, svg, gif'
                })
            }
        }
    })
})