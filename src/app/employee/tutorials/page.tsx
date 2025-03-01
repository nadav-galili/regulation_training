"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  PlayCircle,
  PauseCircle,
  LogOut,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

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
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

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

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const currentTimeValue = videoRef.current.currentTime;
    setCurrentTime(currentTimeValue);

    const currentTime = Math.floor(currentTimeValue);
    const stopPoint = stoppingPoints.find(
      (p) => p.stop_time_seconds === currentTime
    );

    if (stopPoint) {
      videoRef.current.pause();
      setIsPlaying(false);
      fetchQuestionForStopPoint(stopPoint.id);
    }
  };

  const handleVideoLoaded = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleAnswer = (answer: Answer) => {
    if (answer.is_correct) {
      toast({
        title: "נכון מאוד!",
        description: "מצוין! ממשיכים בסרטון...",
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
          title: "לא נכון",
          description: "הסרטון יחזור להתחלה.",
          variant: "destructive",
        });
        setLastWrongAnswer(null);

        // Add a slight delay before resetting the video
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.pause();
            setIsPlaying(false);
            setShowQuestion(false);
            setWrongAttempts([]);
          }
        }, 1500); // 1.5 second delay
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with gradient */}
      <header className="border-b bg-gradient-to-r from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">פורטל ההדרכות</h1>
            {employee && (
              <p className="text-muted-foreground flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                ברוך הבא, {employee.name}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            onClick={() => {
              localStorage.removeItem("employee");
              router.push("/");
            }}
            className="hover:text-primary flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            התנתק
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-6 shadow-lg border-primary/10">
          {/* Video Player Section */}
          <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center overflow-hidden">
            {currentVideo ? (
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  src={currentVideo.video_url}
                  className="w-full h-full rounded-lg"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleVideoLoaded}
                  onClick={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                  controlsList="nodownload"
                  disablePictureInPicture
                />
                <div
                  className="absolute top-0 left-0 w-full h-full"
                  onClick={(e) => {
                    e.preventDefault();
                    if (isPlaying) {
                      videoRef.current?.pause();
                      setIsPlaying(false);
                    } else if (!showQuestion) {
                      videoRef.current?.play();
                      setIsPlaying(true);
                    }
                  }}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center text-muted-foreground">
                <PlayCircle className="w-12 h-12 mb-2 animate-pulse" />
                <p>Loading video...</p>
              </div>
            )}
          </div>

          {/* Controls Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-primary">
                {currentVideo?.title || "Loading..."}
              </h2>
              <Button
                size="lg"
                onClick={handleStartVideo}
                disabled={!currentVideo || isPlaying || showQuestion}
                className="flex items-center gap-2">
                {isPlaying ? (
                  <>
                    <PauseCircle className="w-5 h-5" />
                    Playing...
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-5 h-5" />
                    Start Video
                  </>
                )}
              </Button>
            </div>

            {/* Progress Indicator */}
            <div className="h-2 bg-secondary rounded-full">
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

            {/* Time Display */}
            <div className="flex items-center justify-end text-sm text-muted-foreground mt-1">
              <Clock className="w-4 h-4 mr-1" />
              <span>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Question Section */}
            <div className={showQuestion ? "block" : "hidden"}>
              <Card className="p-6 mt-4 border-primary/10 shadow-md">
                <h3 className="text-lg font-medium mb-4 text-primary">
                  {currentQuestion?.question_text}
                </h3>
                <div className="space-y-2">
                  {currentQuestion?.answers.map((answer) => (
                    <Button
                      key={answer.id}
                      className={cn(
                        "w-full justify-start gap-2",
                        lastWrongAnswer === answer.id &&
                          "bg-red-500/10 border-red-500/50"
                      )}
                      variant="outline"
                      onClick={() => handleAnswer(answer)}>
                      {lastWrongAnswer === answer.id ? (
                        <XCircle className="w-4 h-4 text-red-500" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-primary/50" />
                      )}
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
