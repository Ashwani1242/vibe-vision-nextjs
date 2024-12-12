"use client";

import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { PostFormFields } from "./post-form-fields";
import { MediaSection } from "./media-section";
import { RichTextEditor } from "./rich-text-editor";
import { DraftList } from "./draft-list";
import { usePostSubmission } from "@/hooks/use-post-submission";
import { useMediaUpload } from "@/hooks/use-media-upload";
import { useDraftAutosave } from "@/hooks/use-draft-autosave";
import { postSchema, type PostFormData } from "@/lib/schemas/post-schema";

export function PostForm() {
  const { submitPost, isSubmitting } = usePostSubmission();
  const { processMediaFiles, isProcessing } = useMediaUpload();
  const { toast } = useToast();

  const methods = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      mediaFiles: []
    }
  });

  const { watch, setValue, handleSubmit, formState: { errors } } = methods;
  const formValues = watch();

  // Enable autosave
  useDraftAutosave(formValues);

  const handleMediaSelect = useCallback(async (files: FileList) => {
    try {
      const processedFiles = await processMediaFiles(Array.from(files));
      setValue('mediaFiles', [...formValues.mediaFiles, ...processedFiles], { 
        shouldValidate: true 
      });
    } catch (error) {
      toast({
        title: "Error processing media",
        description: "Some files could not be processed. Please try again.",
        variant: "destructive"
      });
    }
  }, [processMediaFiles, setValue, formValues.mediaFiles, toast]);

  const removeMedia = useCallback((index: number) => {
    setValue('mediaFiles', 
      formValues.mediaFiles.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  }, [setValue, formValues.mediaFiles]);

  const onSubmit = async (data: PostFormData) => {
    try {
      await submitPost(data);
      methods.reset();
      toast({
        title: "Success",
        description: "Your post has been created successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <DraftList />
        
        <AnimatePresence>
          {Object.keys(errors).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {Object.values(errors).map((error, index) => (
                    <div key={index}>{error.message}</div>
                  ))}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <PostFormFields />

        <RichTextEditor 
          content={formValues.content} 
          onChange={(value) => setValue('content', value, { shouldValidate: true })}
          error={errors.content?.message}
        />

        <MediaSection
          mediaFiles={formValues.mediaFiles}
          onMediaSelect={handleMediaSelect}
          onRemoveMedia={removeMedia}
          isProcessing={isProcessing}
          error={errors.mediaFiles?.message}
        />

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% transition-all duration-300 ease-in-out hover:shadow-[0_0_15px_rgba(168,85,247,0.7)] hover:shadow-violet-500 hover:brightness-125 active:scale-95"
          disabled={isSubmitting || isProcessing}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Post...
            </>
          ) : (
            "Create Post"
          )}
        </Button>
      </form>
    </FormProvider>
  );
}