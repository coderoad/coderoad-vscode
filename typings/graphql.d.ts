import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
export type Maybe<T> = T | null
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
  JSON: any
  JSONObject: any
  Sha1: any
}

export type CreateTutorialInput = {
  /** TODO: tutorial type */
  id: Scalars['ID']
  summaryTitle: Scalars['String']
  summaryDescription: Scalars['String']
}

export type CreateTutorialVersionInput = {
  /** TODO: tutorial version type */
  id: Scalars['ID']
}

/** Supported Editors */
export type Editor = 'VSCODE'

/**
 * Login input from an editor extension/plugin
 * Accepts a unique machineId from the editor
 */
export type EditorLoginInput = {
  editor: Editor
  machineId: Scalars['String']
  sessionId: Scalars['String']
}

export type EditorLoginOutput = {
  __typename?: 'editorLoginOutput'
  user: User
  token: Scalars['String']
}

/**
 * File formats supported by VSCode
 * See a complete list at https://code.visualstudio.com/docs/languages/identifiers
 */
export type FileFormat =
  | 'CLOJURE'
  | 'C'
  | 'CPP'
  | 'CSHARP'
  | 'CSS'
  | 'DIFF'
  | 'DOCKERFILE'
  | 'FSHARP'
  | 'GO'
  | 'HTML'
  | 'INI'
  | 'JAVA'
  | 'JS'
  | 'JSON'
  | 'JSONC'
  | 'JSX'
  | 'LATEX'
  | 'LESS'
  | 'LUA'
  | 'MARKDOWN'
  | 'PHP'
  | 'PY'
  | 'R'
  | 'RB'
  | 'RUST'
  | 'SASS'
  | 'SCSS'
  | 'SQL'
  | 'SWIFT'
  | 'TS'
  | 'TSX'
  | 'XML'
  | 'YAML'

/** Information linked from a GitHub account */
export type GithubUser = {
  __typename?: 'GithubUser'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  location?: Maybe<Scalars['String']>
  avatarUrl?: Maybe<Scalars['String']>
}

/** Logical groupings of tasks */
export type Level = {
  __typename?: 'Level'
  id: Scalars['ID']
  title: Scalars['String']
  /** A summary of the level */
  summary: Scalars['String']
  /** The lesson content of the level, parsed as markdown */
  content: Scalars['String']
  /** Actions run on level start up for configuring setup */
  setup?: Maybe<Scalars['JSON']>
  /** A set of tasks for users linked to unit tests */
  steps: Array<Step>
}

export type Mutation = {
  __typename?: 'Mutation'
  /** Login used from a coding editor */
  editorLogin?: Maybe<EditorLoginOutput>
  /** Update a users tutorial progress */
  updateTutorialProgress?: Maybe<Scalars['Boolean']>
  /** Create a new tutorial */
  createTutorial?: Maybe<Tutorial>
  /** Create a new tutorial version */
  createTutorialVersion?: Maybe<TutorialVersion>
  /** Update a tutorial version */
  updateTutorialVersion?: Maybe<TutorialVersion>
  /** Publish a tutorial version */
  publishTutorialVersion?: Maybe<Tutorial>
  /** Deprecate a tutorial version */
  deprecateTutorialVersion?: Maybe<Scalars['Boolean']>
}

export type MutationEditorLoginArgs = {
  input: EditorLoginInput
}

export type MutationUpdateTutorialProgressArgs = {
  input: UpdateTutorialProgressInput
}

export type MutationCreateTutorialArgs = {
  input: Scalars['String']
}

export type MutationCreateTutorialVersionArgs = {
  input: CreateTutorialVersionInput
}

export type MutationUpdateTutorialVersionArgs = {
  input: UpdateTutorialVersionInput
}

export type MutationPublishTutorialVersionArgs = {
  tutorialId: Scalars['ID']
  versionID: Scalars['ID']
}

export type MutationDeprecateTutorialVersionArgs = {
  tutorialId: Scalars['ID']
  versionID: Scalars['ID']
}

export type Query = {
  __typename?: 'Query'
  /** Return a tutorial based on it's ID */
  tutorial?: Maybe<Tutorial>
  /** Returns a list of tutorials */
  tutorials: Array<Maybe<Tutorial>>
  viewer?: Maybe<User>
}

export type QueryTutorialArgs = {
  id: Scalars['ID']
}

export type Role = 'ADMIN' | 'EDITOR_USER'

/** A level task */
export type Step = {
  __typename?: 'Step'
  id: Scalars['ID']
  content: Scalars['String']
  setup?: Maybe<Scalars['JSON']>
  solution?: Maybe<Scalars['JSON']>
}

/** A tutorial for use in VSCode CodeRoad */
export type Tutorial = {
  __typename?: 'Tutorial'
  id: Scalars['ID']
  createdBy?: Maybe<User>
  version: TutorialVersion
  versions: Array<TutorialVersion>
  summary: TutorialSummary
}

/** A tutorial for use in VSCode CodeRoad */
export type TutorialVersionArgs = {
  id?: Maybe<Scalars['String']>
}

/** Data for tutorial */
export type TutorialData = {
  __typename?: 'TutorialData'
  config: Scalars['JSON']
  levels: Array<Level>
}

export type TutorialProgressStatus = 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED'

export type TutorialProgressType = 'LEVEL' | 'STEP' | 'TUTORIAL'

export type TutorialRepoInput = {
  uri: Scalars['String']
  branch: Scalars['String']
}

/** Summary of tutorial used when selecting tutorial */
export type TutorialSummary = {
  __typename?: 'TutorialSummary'
  title: Scalars['String']
  description: Scalars['String']
}

/** A version of a tutorial */
export type TutorialVersion = {
  __typename?: 'TutorialVersion'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  createdBy: User
  updatedAt: Scalars['DateTime']
  updatedBy: User
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedBy?: Maybe<User>
  data: TutorialData
}

export type UpdateTutorialProgressInput = {
  tutorialId: Scalars['ID']
  versionId: Scalars['ID']
  type: TutorialProgressType
  entityId: Scalars['ID']
  status: TutorialProgressStatus
}

export type UpdateTutorialVersionInput = {
  /** TODO: tutorial version type */
  id: Scalars['ID']
}

/**
 * Users is useful for tracking completion progress
 * & credit for tutorial creation/contributions
 */
export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  ID: ResolverTypeWrapper<Scalars['ID']>
  Tutorial: ResolverTypeWrapper<Tutorial>
  User: ResolverTypeWrapper<User>
  String: ResolverTypeWrapper<Scalars['String']>
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>
  TutorialVersion: ResolverTypeWrapper<TutorialVersion>
  TutorialData: ResolverTypeWrapper<TutorialData>
  JSON: ResolverTypeWrapper<Scalars['JSON']>
  Level: ResolverTypeWrapper<Level>
  Step: ResolverTypeWrapper<Step>
  TutorialSummary: ResolverTypeWrapper<TutorialSummary>
  Mutation: ResolverTypeWrapper<{}>
  editorLoginInput: EditorLoginInput
  Editor: Editor
  editorLoginOutput: ResolverTypeWrapper<EditorLoginOutput>
  updateTutorialProgressInput: UpdateTutorialProgressInput
  TutorialProgressType: TutorialProgressType
  TutorialProgressStatus: TutorialProgressStatus
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  createTutorialVersionInput: CreateTutorialVersionInput
  updateTutorialVersionInput: UpdateTutorialVersionInput
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>
  Sha1: ResolverTypeWrapper<Scalars['Sha1']>
  Role: Role
  FileFormat: FileFormat
  tutorialRepoInput: TutorialRepoInput
  createTutorialInput: CreateTutorialInput
  GithubUser: ResolverTypeWrapper<GithubUser>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  ID: Scalars['ID']
  Tutorial: Tutorial
  User: User
  String: Scalars['String']
  DateTime: Scalars['DateTime']
  TutorialVersion: TutorialVersion
  TutorialData: TutorialData
  JSON: Scalars['JSON']
  Level: Level
  Step: Step
  TutorialSummary: TutorialSummary
  Mutation: {}
  editorLoginInput: EditorLoginInput
  Editor: Editor
  editorLoginOutput: EditorLoginOutput
  updateTutorialProgressInput: UpdateTutorialProgressInput
  TutorialProgressType: TutorialProgressType
  TutorialProgressStatus: TutorialProgressStatus
  Boolean: Scalars['Boolean']
  createTutorialVersionInput: CreateTutorialVersionInput
  updateTutorialVersionInput: UpdateTutorialVersionInput
  JSONObject: Scalars['JSONObject']
  Sha1: Scalars['Sha1']
  Role: Role
  FileFormat: FileFormat
  tutorialRepoInput: TutorialRepoInput
  createTutorialInput: CreateTutorialInput
  GithubUser: GithubUser
}

export type AuthDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = { requires?: Maybe<Maybe<Role>> }
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type EditorLoginOutputResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['editorLoginOutput'] = ResolversParentTypes['editorLoginOutput']
> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type GithubUserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GithubUser'] = ResolversParentTypes['GithubUser']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON'
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject'
}

export type LevelResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Level'] = ResolversParentTypes['Level']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  summary?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  setup?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>
  steps?: Resolver<Array<ResolversTypes['Step']>, ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  editorLogin?: Resolver<
    Maybe<ResolversTypes['editorLoginOutput']>,
    ParentType,
    ContextType,
    RequireFields<MutationEditorLoginArgs, 'input'>
  >
  updateTutorialProgress?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTutorialProgressArgs, 'input'>
  >
  createTutorial?: Resolver<
    Maybe<ResolversTypes['Tutorial']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateTutorialArgs, 'input'>
  >
  createTutorialVersion?: Resolver<
    Maybe<ResolversTypes['TutorialVersion']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateTutorialVersionArgs, 'input'>
  >
  updateTutorialVersion?: Resolver<
    Maybe<ResolversTypes['TutorialVersion']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTutorialVersionArgs, 'input'>
  >
  publishTutorialVersion?: Resolver<
    Maybe<ResolversTypes['Tutorial']>,
    ParentType,
    ContextType,
    RequireFields<MutationPublishTutorialVersionArgs, 'tutorialId' | 'versionID'>
  >
  deprecateTutorialVersion?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeprecateTutorialVersionArgs, 'tutorialId' | 'versionID'>
  >
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  tutorial?: Resolver<
    Maybe<ResolversTypes['Tutorial']>,
    ParentType,
    ContextType,
    RequireFields<QueryTutorialArgs, 'id'>
  >
  tutorials?: Resolver<Array<Maybe<ResolversTypes['Tutorial']>>, ParentType, ContextType>
  viewer?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
}

export interface Sha1ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Sha1'], any> {
  name: 'Sha1'
}

export type StepResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Step'] = ResolversParentTypes['Step']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  setup?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>
  solution?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>
}

export type TutorialResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Tutorial'] = ResolversParentTypes['Tutorial']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  version?: Resolver<ResolversTypes['TutorialVersion'], ParentType, ContextType, TutorialVersionArgs>
  versions?: Resolver<Array<ResolversTypes['TutorialVersion']>, ParentType, ContextType>
  summary?: Resolver<ResolversTypes['TutorialSummary'], ParentType, ContextType>
}

export type TutorialDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TutorialData'] = ResolversParentTypes['TutorialData']
> = {
  config?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>
  levels?: Resolver<Array<ResolversTypes['Level']>, ParentType, ContextType>
}

export type TutorialSummaryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TutorialSummary'] = ResolversParentTypes['TutorialSummary']
> = {
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type TutorialVersionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TutorialVersion'] = ResolversParentTypes['TutorialVersion']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  updatedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  publishedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>
  publishedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  data?: Resolver<ResolversTypes['TutorialData'], ParentType, ContextType>
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType
  editorLoginOutput?: EditorLoginOutputResolvers<ContextType>
  GithubUser?: GithubUserResolvers<ContextType>
  JSON?: GraphQLScalarType
  JSONObject?: GraphQLScalarType
  Level?: LevelResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Sha1?: GraphQLScalarType
  Step?: StepResolvers<ContextType>
  Tutorial?: TutorialResolvers<ContextType>
  TutorialData?: TutorialDataResolvers<ContextType>
  TutorialSummary?: TutorialSummaryResolvers<ContextType>
  TutorialVersion?: TutorialVersionResolvers<ContextType>
  User?: UserResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
export type DirectiveResolvers<ContextType = any> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>
}

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>
