import {
  ActionBarPrimitive,
  BranchPickerPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
} from "@assistant-ui/react";
import { useEffect, useState, type FC } from "react";
import {
  ArrowDownIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  Mic,
  Paperclip,
  PencilIcon,
  Percent,
  PieChart,
  RefreshCwIcon,
  SendHorizontalIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/chatbot/ui/button";
import { TooltipIconButton } from "./tooltip-icon-button";
import { MarkdownText } from "./markdown-text";

const initialState={
  age: "",
  payroll_id: '23',
  blind: false,
  other_credit: 0,
  deductions: {
    charitable_donations: 0,
    home_mortgage_interest: 0,
    ira_contribution: 0,
    medical_expenses: 0,
    other_deductions: 0,
    state_or_local_tax: 0,
    student_loan_interest: 0,
  },
  selectedDeductions: [], // Initialize empty
  any_dependents: null,
  // dependents: [
  //   // {
  //   //   age: "",
  //   //   is_disabled: false,
  //   //   is_living_together: false,
  //   //   is_student: false,
  //   // },
  // ],
  filing_status: "",
  four_pay_cycle: false,
  incomes: {
    dividend_income: null,
    interest_income: null,
    retirement_income: null,
    self_employment_income: null,
    unemployment_income: null,
    yearly_salary: [],
  },
  left_job: false,
  left_spouse_job: null,
  prior_job_value: [
    {
      salary: null,
      withholding: null,
    },
  ],
  self_jobs: [
    {
      type: "",
      yearly_salary: null,
    
      pay_frequency: "",
      withholding_on_last_paycheck: null,
      original_withholding_ytd: null,
    },
  ],
  more_than_one_job: false,
  pay_frequency: [],
 
  take_standard_deduction: false,
  otherCredits: null,
  // total_withholding_ytd: 0,
  original_withholding_ytd: [],
  withholding_on_last_paycheck: [],
  goal_type: "",
  goal_amount: null,
  most_recent_pay_date_dt: "",
  start_pay_date_dt: "",
  tax_calculation_id: "",
  tax_token_value: "",
   refresh_token_value: "",
  set_refund_value: null,
  set_tax_cal: "",
  constant_boost: 0,
  file_spouse: null,
  head_household: null,
  spouse_age: "",
  spouseJobCount: null,
  JobCount: null,
  isCheck:false,
 
}

export const Thread: any = ({activeTab, setActiveTab}:any) => {
  const [modalType, setModalType] = useState<"login" | "taxdata">("login");
  const [message, setMessage] = useState<string>("");

  const [user, setUser] = useState<any>({});
  const [sessionId, setSessionId] = useState<any>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState(initialState);
  // const sendMessage = async () => {
  //   if (!message.trim()) return;

  //   setMessages((prev: any) => [...prev, generateMessage("user", message)]);
  //   setMessage("");
  //   setLoading(true);

  //   try {
  //     if (activeTab === "learn") {
  //       const data = await sendQuery(message);

  //       if (data) {
  //         const responseMessage = data?.response;

  //         setMessages((prev: any) => [
  //           ...prev,
  //           generateMessage("system", responseMessage),
  //         ]);
  //       }
  //     } else {
  //       const data = await sendMessagetax(message, sessionId);

  //       if (data) {
  //         const responseMessage = data?.response;
  //         setShowModal(false);
  //         setMessages((prev: any) => [
  //           ...prev,
  //           generateMessage("system", responseMessage),
  //         ]);
  //         setShowModal(false);
  //         if (data?.recommendation_question) {
  //           setMessages((prev: any) => [
  //             ...prev,
  //             generateMessage("system", data?.recommendation_question),
  //           ]);
  //           // generateMessage("system", data.recommendation_question),
  //         }
  //       }
  //     }
  //   } catch (error: any) {
  //     console.error("Error sending query:", error);
  //     setMessages((prev: any) => [
  //       ...prev,
  //       generateMessage(
  //         "system",
  //         "Sorry, something went wrong. Please try again later."
  //       ),
  //     ]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    setShowModal(true);
    setModalType("login");
  }, [1]);


  return (
    <>
      <div>
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center space-x-4 mb-10 border border-lightGray7 rounded-full p-2">
            <button
              onClick={() => setActiveTab("tax")}
              className={`px-4 py-2  rounded-full text-lg font-medium flex items-center justify-center gap-2  transition-all duration-200 ${
                activeTab === "tax"
                  ? "bg-mediumBlueGradient text-white"
                  : "text-textgray "
              }`}
            >
              <PieChart /> Tax Calculation
            </button>
            <button
              onClick={() => setActiveTab("learn")}
              className={`px-5 py-2  rounded-full text-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
                activeTab === "learn"
                  ? "bg-mediumBlueGradient text-white"
                  : "text-textgray"
              }`}
            >
              <Percent /> Learn About Tax
            </button>
          </div>
        </div>
        <ThreadPrimitive.Root
          className="bg-background box-border flex flex-col overflow-hidden"
          style={{
            ["--thread-max-width" as string]: "42rem",
          }}
        >
          <ThreadPrimitive.Viewport className="flex h-[calc(100vh-120px)] flex-col items-center chat-scroll overflow-y-scroll scroll-smooth bg-inherit px-4 pt-8">
            <ThreadWelcome />

            <ThreadPrimitive.Messages
              components={{
                UserMessage: UserMessage,
                EditComposer: EditComposer,
                AssistantMessage: AssistantMessage,
              }}
            />

            <ThreadPrimitive.If empty={false}>
              <div className="min-h-8 flex-grow" />
            </ThreadPrimitive.If>

            <div className="sticky bottom-0 mt-3 flex w-full max-w-[var(--thread-max-width)] flex-col items-center justify-end rounded-t-lg bg-inherit pb-4">
              <ThreadScrollToBottom />
              <Composer />
            </div>
          </ThreadPrimitive.Viewport>
        </ThreadPrimitive.Root>
      </div>
    </>
  );
};

const ThreadScrollToBottom: FC = () => {
  return (
    <ThreadPrimitive.ScrollToBottom asChild>
      <TooltipIconButton
        tooltip="Scroll to bottom"
        variant="outline"
        className="absolute -top-8 rounded-full disabled:invisible"
      >
        <ArrowDownIcon />
      </TooltipIconButton>
    </ThreadPrimitive.ScrollToBottom>
  );
};

const ThreadWelcome: FC = () => {
  return (
    <ThreadPrimitive.Empty>
      <div className="flex w-full max-w-[var(--thread-max-width)] flex-grow flex-col">
        <div className="flex w-full flex-grow flex-col items-center justify-center">
          <p className="mt-4 font-medium">Stuck with Taxes. No Worries Uncle Sam is Here?</p>
        </div>
        <ThreadWelcomeSuggestions />
      </div>
    </ThreadPrimitive.Empty>
  );
};

const ThreadWelcomeSuggestions: FC = () => {
  return (
    <div className="mt-3 flex w-full items-stretch justify-center gap-4">
      <ThreadPrimitive.Suggestion
        className="hover:bg-muted/80 flex max-w-sm grow basis-0 flex-col items-center justify-center rounded-lg border p-3 transition-colors ease-in"
        prompt="What is the weather in Tokyo?"
        method="replace"
        autoSend
      >
        <span className="line-clamp-2 text-ellipsis text-sm font-semibold">
          How can i claim my tax refund?
        </span>
      </ThreadPrimitive.Suggestion>
      <ThreadPrimitive.Suggestion
        className="hover:bg-muted/80 flex max-w-sm grow basis-0 flex-col items-center justify-center rounded-lg border p-3 transition-colors ease-in"
        prompt="What is assistant-ui?"
        method="replace"
        autoSend
      >
        <span className="line-clamp-2 text-ellipsis text-sm font-semibold">
          What is W4 Form?
        </span>
      </ThreadPrimitive.Suggestion>
    </div>
  );
};

const Composer: FC = () => {
  return (
    <ComposerPrimitive.Root className="focus-within:border-ring/20 flex w-full flex-wrap items-end rounded-lg border bg-inherit px-2.5 shadow-sm transition-colors ease-in gap-2">
      <ComposerPrimitive.Input
        rows={1}
        autoFocus
        placeholder="Write a message..."
        className="placeholder:text-muted-foreground max-h-40 flex-grow resize-none border-none bg-transparent px-2 py-4 text-sm outline-none focus:ring-0 disabled:cursor-not-allowed"
      />
      <ComposerAction />
    </ComposerPrimitive.Root>
  );
};

const ComposerAction: FC = () => {
  return (
    <>
      <ThreadPrimitive.If running={false}>
        <TooltipIconButton
          tooltip="Link"
          variant="default"
          className="my-2.5 size-8 p-2 bg-transparent border border-lightGray4 rounded-full transition-opacity ease-in"
        >
          <Paperclip className="text-textgray" />
        </TooltipIconButton>
        <TooltipIconButton
          tooltip="Voice"
          variant="default"
          className="my-2.5 size-8 p-2 bg-transparent border border-lightGray4 rounded-full transition-opacity ease-in"
        >
          <Mic className="text-textgray" />
        </TooltipIconButton>
        <ComposerPrimitive.Send asChild>
          <TooltipIconButton
            tooltip="Send"
            variant="default"
            className="my-2.5 size-8 p-2 bg-mediumBlueGradient rounded-full transition-opacity ease-in"
          >
            <SendHorizontalIcon />
          </TooltipIconButton>
        </ComposerPrimitive.Send>
      </ThreadPrimitive.If>
      <ThreadPrimitive.If running>
        <ComposerPrimitive.Cancel asChild>
          <TooltipIconButton
            tooltip="Cancel"
            variant="default"
            className="my-2.5 size-8 p-2 transition-opacity ease-in"
          >
            <CircleStopIcon />
          </TooltipIconButton>
        </ComposerPrimitive.Cancel>
      </ThreadPrimitive.If>
    </>
  );
};

const UserMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="grid auto-rows-auto grid-cols-[minmax(72px,1fr)_auto] gap-y-2 [&:where(>*)]:col-start-2 w-full max-w-[var(--thread-max-width)] py-4">
      <UserActionBar />

      <div className="bg-lightBlue text-slateColor max-w-[calc(var(--thread-max-width)*0.8)] break-words rounded-3xl px-5 py-2.5 col-start-2 row-start-2">
        <MessagePrimitive.Content />
      </div>

      <BranchPicker className="col-span-full col-start-1 row-start-3 -mr-1 justify-end" />
    </MessagePrimitive.Root>
  );
};

const UserActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      className="flex flex-col items-end col-start-1 row-start-2 mr-3 mt-2.5"
    >
      <ActionBarPrimitive.Edit asChild>
        <TooltipIconButton tooltip="Edit">
          <PencilIcon />
        </TooltipIconButton>
      </ActionBarPrimitive.Edit>
    </ActionBarPrimitive.Root>
  );
};

const EditComposer: FC = () => {
  return (
    <ComposerPrimitive.Root className="bg-muted my-4 flex w-full max-w-[var(--thread-max-width)] flex-col gap-2 rounded-xl">
      <ComposerPrimitive.Input className="text-foreground flex h-8 w-full resize-none bg-transparent p-4 pb-0 outline-none" />

      <div className="mx-3 mb-3 flex items-center justify-center gap-2 self-end">
        <ComposerPrimitive.Cancel asChild>
          <Button variant="ghost">Cancel</Button>
        </ComposerPrimitive.Cancel>
        <ComposerPrimitive.Send asChild>
          <Button>Send</Button>
        </ComposerPrimitive.Send>
      </div>
    </ComposerPrimitive.Root>
  );
};

const AssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="grid grid-cols-[auto_auto_1fr] grid-rows-[auto_1fr] relative w-full max-w-[var(--thread-max-width)] py-4">
      <div className="text-foreground max-w-[calc(var(--thread-max-width)*0.8)] break-words leading-7 col-span-2 col-start-2 row-start-1 my-1.5">
        <MessagePrimitive.Content components={{ Text: MarkdownText }} />
      </div>

      <AssistantActionBar />

      <BranchPicker className="col-start-2 row-start-2 -ml-2 mr-2" />
    </MessagePrimitive.Root>
  );
};

const AssistantActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      autohideFloat="single-branch"
      className="text-muted-foreground flex gap-1 col-start-3 row-start-2 -ml-1 data-[floating]:bg-background data-[floating]:absolute data-[floating]:rounded-md data-[floating]:border data-[floating]:p-1 data-[floating]:shadow-sm"
    >
      <ActionBarPrimitive.Copy asChild>
        <TooltipIconButton tooltip="Copy">
          <MessagePrimitive.If copied>
            <CheckIcon />
          </MessagePrimitive.If>
          <MessagePrimitive.If copied={false}>
            <CopyIcon />
          </MessagePrimitive.If>
        </TooltipIconButton>
      </ActionBarPrimitive.Copy>
      <ActionBarPrimitive.Reload asChild>
        <TooltipIconButton tooltip="Refresh">
          <RefreshCwIcon />
        </TooltipIconButton>
      </ActionBarPrimitive.Reload>
    </ActionBarPrimitive.Root>
  );
};

const BranchPicker: FC<BranchPickerPrimitive.Root.Props> = ({
  className,
  ...rest
}) => {
  return (
    <BranchPickerPrimitive.Root
      hideWhenSingleBranch
      className={cn(
        "text-muted-foreground inline-flex items-center text-xs",
        className
      )}
      {...rest}
    >
      <BranchPickerPrimitive.Previous asChild>
        <TooltipIconButton tooltip="Previous">
          <ChevronLeftIcon />
        </TooltipIconButton>
      </BranchPickerPrimitive.Previous>
      <span className="font-medium">
        <BranchPickerPrimitive.Number /> / <BranchPickerPrimitive.Count />
      </span>
      <BranchPickerPrimitive.Next asChild>
        <TooltipIconButton tooltip="Next">
          <ChevronRightIcon />
        </TooltipIconButton>
      </BranchPickerPrimitive.Next>
    </BranchPickerPrimitive.Root>
  );
};

const CircleStopIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      width="16"
      height="16"
    >
      <rect width="10" height="10" x="3" y="3" rx="2" />
    </svg>
  );
};
