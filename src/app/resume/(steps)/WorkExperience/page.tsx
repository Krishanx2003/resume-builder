"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, HelpCircle } from 'lucide-react';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const workExperienceSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  companyName: z.string().min(1, "Company name is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  startMonth: z.number().min(1, "Start month is required"),
  startYear: z.number().min(1, "Start year is required"),
  endMonth: z.number().nullable(),
  endYear: z.number().nullable(),
  currentlyWorkHere: z.boolean(),
  responsibilities: z.string(),
});

const formSchema = z.object({
  workExperiences: z.array(workExperienceSchema),
});

type FormValues = z.infer<typeof formSchema>;

export default function WorkExperienceForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workExperiences: [
        {
          jobTitle: "",
          companyName: "",
          country: "",
          state: "",
          startMonth: new Date().getMonth() + 1,
          startYear: new Date().getFullYear(),
          endMonth: null,
          endYear: null,
          currentlyWorkHere: false,
          responsibilities: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "workExperiences",
    control: form.control,
  });

  const onSubmit = async (data: FormValues) => {
    const convertedData = data.workExperiences.map(experience => ({
      ...experience,
      startMonth: parseInt(experience.startMonth.toString(), 10),
      startYear: parseInt(experience.startYear.toString(), 10),
      endMonth: experience.endMonth ? parseInt(experience.endMonth.toString(), 10) : null,
      endYear: experience.endYear ? parseInt(experience.endYear.toString(), 10) : null,
    }));

    const response = await fetch('/api/work-experience', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(convertedData),
    });

    if (response.ok) {
      alert('Work experience added successfully');
    } else {
      const errorData = await response.json();
      alert(`Error adding work experience: ${errorData.error}`);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
        <CardDescription>Add your previous job experiences to showcase your professional background.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4">
                <FormField
                  control={form.control}
                  name={`workExperiences.${index}.jobTitle`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your job title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`workExperiences.${index}.companyName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`workExperiences.${index}.country`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            {/* Add more countries as needed */}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`workExperiences.${index}.state`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ca">California</SelectItem>
                            <SelectItem value="ny">New York</SelectItem>
                            <SelectItem value="tx">Texas</SelectItem>
                            {/* Add more states as needed */}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`workExperiences.${index}.startMonth`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Month</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select month" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => (
                              <SelectItem key={i} value={(i + 1).toString()}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`workExperiences.${index}.startYear`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Year</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter start year" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
  control={form.control}
  name={`workExperiences.${index}.endMonth`}
  render={({ field }) => (
    <FormItem>
      <FormLabel>End Month</FormLabel>
      <Select
        onValueChange={(value) => field.onChange(parseInt(value, 10))}
        defaultValue={field.value?.toString() || undefined}
        disabled={form.watch(`workExperiences.${index}.currentlyWorkHere`)}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {Array.from({ length: 12 }, (_, i) => (
            <SelectItem key={i} value={(i + 1).toString()}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
<FormField
  control={form.control}
  name={`workExperiences.${index}.endYear`}
  render={({ field }) => (
    <FormItem>
      <FormLabel>End Year</FormLabel>
      <FormControl>
        <Input
          type="number"
          placeholder="Enter end year"
          {...field}
          value={field.value ?? ''}
          disabled={form.watch(`workExperiences.${index}.currentlyWorkHere`)}
          onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

                </div>
                <FormField
                  control={form.control}
                  name={`workExperiences.${index}.currentlyWorkHere`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I currently work here
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`workExperiences.${index}.responsibilities`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Responsibilities</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your responsibilities and achievements"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 inline-block mr-1" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Include key responsibilities, achievements, and skills used in this role.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        Highlight your main duties and accomplishments.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    Remove Job
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({
                jobTitle: "",
                companyName: "",
                country: "",
                state: "",
                startMonth: new Date().getMonth() + 1,
                startYear: new Date().getFullYear(),
                endMonth: null,
                endYear: null,
                currentlyWorkHere: false,
                responsibilities: "",
              })}
            >
              Add Another Job
            </Button>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="ml-auto">Save Work Experience</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}