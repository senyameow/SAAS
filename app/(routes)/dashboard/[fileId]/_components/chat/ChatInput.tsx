'use client'
import React from 'react'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Plus, Send } from 'lucide-react'
import { useModalStore } from '@/hooks/use-modal-store'
import { Button } from '@/components/ui/button'

import axios from 'axios'
import { useRouter } from 'next/navigation'

interface ChatInputProps {
    isDisabled?: boolean;
    fileId: string;
}

const formSchema = z.object({
    content: z.string().min(1, ' ')
})

const ChatInput = ({ isDisabled, fileId }: ChatInputProps) => {

    const router = useRouter()


    const form = useForm<z.infer<typeof formSchema>>({ // прокинули z.infer с типом нашей схемы формы
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: '', // конечно, сначала поле для смски пустое
        },
        // не забываем прокинуть резолвер и в него схему

    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => { // онСабмитыч делаем, в него как обычно поступают какие-то значения с формы, мы так и говорим
        try {
            const message = await axios.post(`/api/${fileId}/messages`, values)

            form.reset()
            router.refresh()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    disabled={form.formState.isSubmitting}
                    control={form.control}
                    name="content" // имя филда отвечает за свое значение в той форм схеме
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className='pb-6 p-4 relative'>
                                    <Input
                                        autoFocus
                                        placeholder={`put your message in here..`}
                                        {...field} disabled={isDisabled} className='px-4 rounded-xl focus-visible:ring-0 ring-offset-0 focus-visible:ring-offset-0 py-6 dark:bg-zinc-700/60 text-zinc-600 dark:text-zinc-200 border' />
                                    <div className='absolute right-6 top-5'>
                                        <Button disabled={form.formState.isSubmitting} type='submit' className='p-3 h-fit rounded-full'>
                                            <Send className='w-4 h-4' />
                                        </Button>
                                    </div>
                                </div>
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

export default ChatInput