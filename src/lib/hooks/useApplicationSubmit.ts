import { supabase } from "@/integrations/supabase/client";
import { ApplicationCreateInput, ApplicationFormInput } from "@/lib/schemas";

export async function submitSimpleApplication(data: ApplicationCreateInput) {
  const { error } = await supabase.from("applications").insert({
    form_type: "simple",
    full_name: data.candidateName,
    email: data.candidateEmail,
    phone: data.candidatePhone,
    age: data.candidateAge,
    professional_area: data.professionalArea,
    experience_level: data.experienceLevel,
    main_challenge: data.mainChallenge,
    main_goal: data.mainGoal,
    investment_willingness: data.investmentWillingness,
    commitment_score: data.commitmentScore,
    consent_lgpd: data.consentLGPD,
    status: "pending",
  });

  if (error) throw error;
}

export async function submitCompleteApplication(data: ApplicationFormInput) {
  const { error } = await supabase.from("applications").insert({
    form_type: "complete",
    full_name: data.fullName,
    email: data.email,
    phone: data.phone,
    age: data.age,
    professional_area: data.mainEducation,
    experience_level: data.currentMoment,
    main_challenge: data.top3Challenges,
    main_goal: data.mainGoal,
    investment_willingness: data.investmentWillingness,
    commitment_score: Math.round(data.satisfactionLevel / 10),
    consent_lgpd: data.consentLGPD,
    status: "pending",
  });

  if (error) throw error;
}
