// used of for project
import {
  IMAGE_CATEGORY,
  GENDER,
  AVATAR_TYPE,
  COMMUNICATION,
  LANGUAGE,
  USER_TYPE,
  PRIVACY,
  STATUS,
  QUESTION_TYPE,
  DIFFICULTY,
} from "./constants";

export type User = {
  id?: string;
  userId?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  dateOfBirth?: Date;
  email?: string;
  phoneNumber?: string;
  gender?: GENDER;
  avatar?: string;
  bio?: string;
  avatarDuration?: Date;
  avatarType?: AVATAR_TYPE;
  preferredCommunication?: COMMUNICATION;
  languagePreference?: LANGUAGE;
  specialachievement?: string;
  interests?: string[];
  ethnicity?: string;
  country?: string;
  beamLevel?: string;
  grade?: string;
  specialEducationNeeds?: string;
  adultToCommunicate?: string;
  registrationDate?: Date;
  updatedAt?: Date;
  registrationStatus?: STATUS;
  lastLoginDates?: Date[];
  totalScore?: number;
  moduleId?: string;
  parentId?: string;
  socialMediaId?: string;
  addressId?: string;
  schoolId?: string;
  onBoarding?: boolean;

  // Relations
  Modules?: Module[];
  ratings?: Rating[];
  StorySubmissions?: StorySubmission[];
  Parents?: Parent;
  favouriteModules?: FavouriteModule[];
  favouriteImages?: FavouriteImage[];
  favouriteAudios?: FavouriteAudio[];
  favouriteVideos?: FavouriteVideo[];
  videos?: Video[];
  audios?: Audio[];
  profilePictureUrls?: Image[];
  socialMedia?: SocialMedia;
  address?: Address;
  allergies?: string[];
  School?: School;
};

export type School = {
  id: string;
  nameOfSchool: string;
  aboutSchool?: string;
  schoolType?: string;
  principalId?: string;
  headOfScienceAndTechnology?: string;
  preferredCommunication: COMMUNICATION;
  typesOfSoftwareUsed: string[];
  acceptanceRatio?: number;
  totalNoOfStudentsInElementarySchool?: number;
  totalNoOfStudentsInMiddleSchool?: number;
  totalNoOfStudentsInHighSchool?: number;
  overallGenderRatio?: number;
  totalNoOfTeacher?: number;
  totalNoOfTeachersInElementarySchool?: number;
  totalNoOfTeachersInMiddleSchool?: number;
  totalNoOfTeachersInHighSchool?: number;
  teacherStudentRationInElementarySchool?: number;
  teacherStudentRationInMiddleSchool?: number;
  teacherStudentRationInHighSchool?: number;
  teacher_ageRangeInElementarySchool?: string;
  teacher_ageRangeInMiddleSchool?: string;
  teacher_ageRangeInHighSchool?: string;
  teachersGenderRatioInElementarySchool?: number;
  teachersGenderRatioInMiddleSchool?: number;
  teachersGenderRatioInHighSchool?: number;
  teachers_averageExperienceInElementarySchool?: number;
  teachers_averageExperienceInMiddleSchool?: number;
  teachers_averageExperienceInHighSchool?: number;
  schoolStateRanking?: number;
  schoolNationalRanking?: number;
  establishedIn?: Date;
  average_classSize?: number;
  created_at: Date;
  socialMediaId?: string;
  addressId?: string;

  // Relations
  Students?: User[];
  Address?: Address;
  SocialMedia?: SocialMedia;
  Images?: Image[];
};

export type Parent = {
  id?: string;
  name?: string;
  userId?: string;
  profileUrl?: string;
  email?: string;
  phoneNumber?: string;
  preferredCommunication?: COMMUNICATION;
  addressId?: string;
  socialMediaId?: string;

  // Relations
  Address?: Address;
  socialMedia?: SocialMedia;
  children?: User[];
  createdAt?: Date;
};

export type Address = {
  id: string;
  street?: string;
  city?: string;
  stateProvince?: string;
  postalCode?: string;
  country?: string;
  type?: string;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  User?: User[]; // Assuming User is an existing type
  Parent?: Parent[]; // Assuming Parent is an existing type
  School?: School[]; // Assuming School is an existing type
};

export type Image = {
  id?: string;
  userId?: string;
  moduleId?: string;
  questionId?: string;
  serialNoInModule?: number;
  isCoverPage?: boolean;
  pageNoInUserMadeStory?: number;
  elementData?: string;
  imageType?: IMAGE_CATEGORY;
  characterType?: string;
  isProfile?: boolean;
  tags?: string[];
  category?: string;
  licenseType?: string;
  uploadedAt?: Date | null;
  dim?: string;
  uploadedBy?: USER_TYPE;
  storyId?: string;
  url?: string;
  createdAt?: Date;
  startTime?: Date;
  endTime?: Date;

  // Relations
  User?: User;
  Module?: Module;
  Story?: Story;
  Favourites?: FavouriteImage[];
  StoryByUser?: StorySubmission;
};

export type Video = {
  id?: string;
  userId?: string;
  moduleId?: string;
  questionId?: string;
  serialNoInModule?: number;
  pageNoInUserMadeStory?: number;
  elementData?: string;
  imageType?: IMAGE_CATEGORY;
  tags?: string[];
  category?: string;
  licenseType?: string;
  uploadedAt?: Date;
  uploadedBy?: USER_TYPE;
  storyId?: string;
  url?: string;
  createdAt?: Date;
  startTime?: Date;
  endTime?: Date;

  // Relations
  User?: User;
  Module?: Module;
  Story?: Story;
  Favourites?: FavouriteVideo[];
  StoryByUser?: StorySubmission;
};

export type Audio = {
  id?: string;
  userId?: string;
  moduleId?: string;
  questionId?: string;
  serialNoInModule?: number;
  tags?: string[];
  category?: string;
  licenseType?: string;
  uploadedAt?: Date;
  uploadedBy?: USER_TYPE;
  storyId?: string;
  url?: string;
  createdAt?: Date;
  startTime?: Date;
  endTime?: Date;

  // Relations
  User?: User;
  Module?: Module;
  Story?: Story;
  Favourites?: FavouriteAudio[];
  StoryByUser?: StorySubmission;
};
// Story.ts
export type Story = {
  id?: string;
  storyTitle?: string;
  publishedAt?: Date;
  userMade?: boolean;
  storyText?: string;
  noOfCharacter?: number;
  storyTheme?: string;
  ageGroup?: string;
  pageCount?: number;
  storyCategory?: string[];
  audioInteraction?: string;
  videoInteraction?: string;
  urlInteraction?: string;
  motionInteraction?: string;
  otherInteraction?: string;
  moduleId?: string;
  createdAt?: Date;
  updatedAt?: Date;

  // Relations
  Audios?: Audio[];
  Images?: Image[];
  Videos?: Video[];
  Module?: Module;
  userSubmission?: StorySubmission[];
};

export type StorySubmission = {
  id?: string;
  submissionDate?: Date;
  storyTitle?: string;
  publishedAt?: Date;
  storyText?: string;
  nOfCharacters?: number;
  storyTheme?: string;
  wordCount?: bigint;
  status?: STATUS;
  noOfSlideDone?: number;
  timeTaken?: number;
  userId?: string;
  storyId?: string;
  startTime?: Date;
  endTime?: Date;

  // Relations
  User?: User;
  Story?: Story;
  Images?: Image[];
  Videos?: Video[];
  Audios?: Audio[];
};

export type Module = {
  id?: string;
  moduleName?: string;
  title?: string;
  description?: string;
  subject?: string;
  topic?: string;
  createdAt?: Date;
  updatedAt?: Date;
  ageGroup?: string;
  whenToBeLive?: Date;
  serialNoInModule?: number;
  status?: STATUS;
  language?: LANGUAGE;
  privacy?: PRIVACY;

  // Relations
  moduleThumnailUrls?: Image[];
  Rating?: Rating[];
  User?: User[];
  Favourite?: FavouriteModule[];
  Videos?: Video[];
  Audios?: Audio[];
  Stories?: Story[];
};

export type ModuleAttempt = {
  id: string;
  userId: string;
  moduleId: string;
  noOfProductsDone: number;
  startedAt: Date;
  endedAt?: Date;

  // Relations
  Module?: Module;
  User?: User;
};

export type Quiz = {
  id: string;
  quizName?: string;
  quizTitle?: string;
  quizDescription?: string;
  quizThumbnail?: Image[];
  serialNoInModule?: number;
  whenToBeLive?: Date;
  quizDuration?: number;
  noOfQuestions?: number;
  subject?: string;
  topic?: string;
  questionTypes?: QUESTION_TYPE[];
  privacy?: PRIVACY;
  status?: STATUS;
  language?: LANGUAGE;
  createdAt?: Date;
  updatedAt?: Date;

  // Relations
  Attempts?: QuizAttempt[];
  Rating?: Rating[];
  Questions?: Question[];
  Module?: Module;
  moduleId?: string;
};

export type QuizAttempt = {
  id?: string;
  timeTaken?: number;
  noOfQuestionsAttempted?: number;
  noOfCorrectAnswers?: number;
  noOfIncorrectAnswers?: number;
  status?: STATUS;
  score?: number;
  Quiz?: Quiz;
  quizId?: string;
  User?: User;
  userId?: string;
  createdAt?: Date;
  endedAt?: Date;

  // Relations
  answersToQuiz?: AnswerToQuestion[];
};

export type Question = {
  id?: string;
  questionType?: "MCQ" | "TRUEFALSE" | "FILLUPSHORT" | "FILLUPLONG";
  questionText?: string | null;
  optionOne?: string | null;
  optionTwo?: string | null;
  optionThree?: string | null;
  optionFour?: string | null;
  questionNo?: number | null;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  marks?: number | null;
  timeLimit?: number | null;
  tags?: string[] | null;
  hint?: string | null;
  relatedTopic?: string[] | null;
  explaination?: string | null;
  gradeLevel?: string | null;
  correctAns?: string | null;
  ratingNeeded?: boolean | null;
  createdAt?: Date | null;

  // Relations
  imageUrls?: Image[];
  vedioUrls?: Video[];
  audioUrl?: Audio[];
  Ratings?: Rating[];
  Quiz?: Quiz;
  quizId?: string | null;
  Answers?: AnswerToQuestion[];
};
// AnswerToQuestion.ts
export type AnswerToQuestion = {
  id?: string;
  isCorrect?: boolean;
  userId?: string;
  answer?: string;
  imageUrl?: string;
  vedioUrl?: string;
  audioUrl?: string;
  timeTaken?: number;
  attempt?: number;
  marksScored?: number;
  createdAt?: Date;

  // Relations
  User?: User;
  Question?: Question;
  questionId?: string;
  Quiz?: Quiz;
  quizId?: string;
  QuizAttempt?: QuizAttempt;
  quizAttemptId?: string;
};

// jisgaw

export type JigSaw = {
  id?: string;
  image?: Image[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type JigSawAttempt = {
  id?: string;
  quit: boolean;
  jigSawId?: string;
  jisSaw?: JigSaw;
  userId?: string;
  user?: User;
  difficulty?: DIFFICULTY;
  createdAt?: Date;
};
// SocialMedia.ts
export type SocialMedia = {
  id?: string;
  x?: string;
  facebook?: string;
  youtube?: string;
  instagram?: string;
  telegram?: string;
  linkedIn?: string;
  pinterest?: string;
  whatsApp?: string;
  website?: string;

  // Relations
  User?: User[];
  Parent?: Parent[];
  School?: School[];
};
// FavouriteModule.ts
export type FavouriteModule = {
  id?: string;
  moduleId?: string;

  // Relations
  User?: User;
  userId?: string;
  Module?: Module;
};

// FavouriteImage.ts
export type FavouriteImage = {
  id?: string;
  imageId?: string;

  // Relations
  User?: User;
  userId?: string;
  Image?: Image;
};

// FavouriteAudio.ts
export type FavouriteAudio = {
  id?: string;
  audioId?: string;

  // Relations
  User?: User;
  userId?: string;
  Audio?: Audio;
};

// FavouriteVideo.ts
export type FavouriteVideo = {
  id?: string;
  videoId?: string;

  // Relations
  User?: User;
  userId?: string;
  Video?: Video;
};
// Rating.ts
export type Rating = {
  id?: string;
  userId?: string;
  moduleId?: string;
  ratingText: string;
  created_at?: Date;
  rating?: number;

  // Relations
  Module?: Module;
  User?: User;
  Quiz?: Quiz;
  Question?: Question;
  Reel?: Reel;
};
export type Reel = {
  id: string;
  toBeLiveAt: Date;
  duration: number;
  createAt: Date;
  updatedAt: Date;
  status: STATUS;
  language: LANGUAGE;
  privacy: PRIVACY;

  // Relations
  videoUrl?: Video[]; // Assuming videoUrl is an array of Video type
  moduleId?: string;
  Module?: Module; // Assuming Module is an existing type
  Rating?: Rating[]; // Assuming Rating is an existing type
};

export type QuestionSavingProps = {
  questionId: string;
  isCorrect: boolean;
  imageUrl?: string;
  vedioUrl?: string;
  audioUrl?: string;
  marksScored: number;
  timeTaken: number;
  answer: string;
  quizId: string;
  status: boolean;
  attemptId: string;
};

export type SpotTheDifferenceType = {
  no: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
};
