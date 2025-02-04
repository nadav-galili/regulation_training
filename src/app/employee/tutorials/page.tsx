"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Video = {
  id: string;
  title: string;
  video_url: string;
  description: string;
};

type StoppingPoint = {
  id: string;
  stop_time_seconds: number;
  order_index: number;
};

type Question = {
  id: string;
  question_text: string;
  answers: Answer[];
};

type Answer = {
  id: string;
  answer_text: string;
  is_correct: boolean;
};

type Employee = {
  id: string;
  name: string;
};

type AnswerAttempt = {
  questionId: string;
  attempts: number;
};

export default function TutorialPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [stoppingPoints, setStoppingPoints] = useState<StoppingPoint[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const { toast } = useToast();
  const [wrongAttempts, setWrongAttempts] = useState<AnswerAttempt[]>([]);
  const [lastWrongAnswer, setLastWrongAnswer] = useState<string | null>(null);

  const fetchAssignedVideo = useCallback(async () => {
    try {
      if (!employee) {
        console.error("Employee is not set");
        return;
      }
      console.log("Fetching video for employee:", employee.id);

      // Then check the employee_videos assignments with proper join
      const { data: videoData, error: videoError } = await supabase
        .from("employee_videos")
        .select(
          `
          *,
          video:videos!video_id (
            id,
            title,
            video_url,
            description
          )
        `
        )
        .eq("employee_id", employee.id);

      console.log("Video assignments:", videoData);

      if (videoError) throw videoError;
      if (videoData && videoData.length > 0 && videoData[0].video) {
        setCurrentVideo(videoData[0].video as Video);

        // Fetch stopping points
        const { data: stopData, error: stopError } = await supabase
          .from("video_stopping_points")
          .select("*")
          .eq("video_id", videoData[0].video.id)
          .order("order_index");

        console.log("Stopping points:", stopData);

        if (stopError) throw stopError;
        setStoppingPoints(stopData || []);
      } else {
        console.log("No videos assigned to this employee");
      }
    } catch (err) {
      console.error("Error fetching video:", err);
    }
  }, [employee]);

  useEffect(() => {
    // Get employee data from localStorage
    const storedEmployee = localStorage.getItem("employee");
    if (!storedEmployee) {
      router.push("/employee/login");
      return;
    }
    setEmployee(JSON.parse(storedEmployee));
  }, [router]);

  useEffect(() => {
    if (employee?.id) {
      fetchAssignedVideo();
    }
  }, [employee, fetchAssignedVideo]);

  const fetchQuestionForStopPoint = async (stopPointId: string) => {
    try {
      const { data, error } = await supabase
        .from("questions")
        .select(
          `
          id,
          question_text,
          answers (
            id,
            answer_text,
            is_correct
          )
        `
        )
        .eq("stopping_point_id", stopPointId)
        .single();

      if (error) throw error;
      if (data) {
        setCurrentQuestion(data);
        setShowQuestion(true);
      }
    } catch (err) {
      console.error("Error fetching question:", err);
    }
  };

  const handleStartVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const currentTime = Math.floor(videoRef.current.currentTime);
    const stopPoint = stoppingPoints.find(
      (p) => p.stop_time_seconds === currentTime
    );

    if (stopPoint) {
      videoRef.current.pause();
      setIsPlaying(false);
      fetchQuestionForStopPoint(stopPoint.id);
    }
  };

  const handleAnswer = (answer: Answer) => {
    if (answer.is_correct) {
      toast({
        title: "Correct!",
        description: "Good job! Continuing with the video...",
        variant: "default",
      });
      setLastWrongAnswer(null);
      setShowQuestion(false);
      setWrongAttempts([]);
      if (videoRef.current) {
        videoRef.current.play();
        setIsPlaying(true);
        videoRef.current.currentTime += 1;
      }
    } else {
      const currentAttempts =
        wrongAttempts.find((a) => a.questionId === currentQuestion?.id)
          ?.attempts ?? 0;

      if (currentAttempts === 0) {
        setLastWrongAnswer(answer.id);
        setWrongAttempts([
          ...wrongAttempts.filter((a) => a.questionId !== currentQuestion?.id),
          { questionId: currentQuestion?.id ?? "", attempts: 1 },
        ]);
      } else {
        toast({
          title: "Incorrect",
          description: "The video will restart from the beginning.",
          variant: "destructive",
        });
        setLastWrongAnswer(null);
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.pause();
          setIsPlaying(false);
          setShowQuestion(false);
          setWrongAttempts([]);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Training Portal</h1>
            {employee && (
              <p className="text-muted-foreground">Welcome, {employee.name}</p>
            )}
          </div>
          <Button
            variant="ghost"
            onClick={() => {
              localStorage.removeItem("employee");
              router.push("/");
            }}>
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-6">
          {/* Video Player Section */}
          <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center">
            {currentVideo ? (
              <video
                ref={videoRef}
                src={currentVideo.video_url}
                className="w-full h-full rounded-lg"
                onTimeUpdate={handleTimeUpdate}
              />
            ) : (
              <p className="text-muted-foreground">Loading video...</p>
            )}
          </div>

          {/* Controls Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {currentVideo?.title || "Loading..."}
              </h2>
              <Button
                size="lg"
                onClick={handleStartVideo}
                disabled={!currentVideo || isPlaying || showQuestion}>
                {isPlaying ? "Playing..." : "Start Video"}
              </Button>
            </div>

            {/* Progress Indicator */}
            <div className="h-2 bg-muted rounded-full">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{
                  width: videoRef.current
                    ? `${
                        (videoRef.current.currentTime /
                          videoRef.current.duration) *
                        100
                      }%`
                    : "0%",
                }}
              />
            </div>

            {/* Question Section */}
            <div className={showQuestion ? "block" : "hidden"}>
              <Card className="p-4 mt-4">
                <h3 className="text-lg font-medium mb-4">
                  {currentQuestion?.question_text}
                </h3>
                <div className="space-y-2">
                  {currentQuestion?.answers.map((answer) => (
                    <Button
                      key={answer.id}
                      className={cn(
                        "w-full justify-start",
                        lastWrongAnswer === answer.id &&
                          "bg-red-500/10 border-red-500/50"
                      )}
                      variant="outline"
                      onClick={() => handleAnswer(answer)}>
                      {answer.answer_text}
                    </Button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
