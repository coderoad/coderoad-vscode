import {GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig} from 'graphql'
export type Maybe<T> = T | null
export type RequireFields<T, K extends keyof T> = {[X in Exclude<keyof T, K>]?: T[X]} &
	{[P in K]-?: NonNullable<T[P]>}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string
	String: string
	Boolean: boolean
	Int: number
	Float: number
	DateTime: any
	Sha1: any
	JSON: any
	JSONObject: any
}

/** Commits from a Git Repo */
export type Commit = {
	__typename?: 'Commit'
	id: Scalars['Sha1']
	message?: Maybe<Scalars['String']>
	username?: Maybe<Scalars['String']>
}

export type CreateTutorialInput = {
	/** TODO: tutorial type */
	id: Scalars['ID']
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
	description: Scalars['String']
	/** The lesson content of the level, parsed as markdown */
	content: Scalars['String']
	/** A set of tasks for users linked to unit tests */
	steps: Array<Step>
	/** Actions run on level start up for configuring setup */
	setup?: Maybe<StepActions>
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
	input: CreateTutorialInput
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
	tutorial?: Maybe<Tutorial>
	tutorials: Array<Maybe<Tutorial>>
	viewer?: Maybe<User>
	/** TOOD: move inside of viewer */
	commits: Array<Maybe<Commit>>
}

export type QueryTutorialArgs = {
	id: Scalars['ID']
}

export type QueryCommitsArgs = {
	input: TutorialRepoInput
}

export type Role = 'ADMIN' | 'EDITOR_USER'

/** A level task */
export type Step = {
	__typename?: 'Step'
	id: Scalars['ID']
	content: Scalars['String']
	setup: StepActions
	solution: StepActions
}

/** Load commits, open files or run commands */
export type StepActions = {
	__typename?: 'StepActions'
	id: Scalars['ID']
	commits: Array<Scalars['Sha1']>
	files?: Maybe<Array<Scalars['String']>>
	commands?: Maybe<Array<Scalars['String']>>
	watchers?: Maybe<Array<Scalars['String']>>
}

/** A tutorial for use in VSCode CodeRoad */
export type Tutorial = {
	__typename?: 'Tutorial'
	id: Scalars['ID']
	latestVersionId: Scalars['ID']
	version: TutorialVersion
	versions: Array<TutorialVersion>
	summary: TutorialSummary
}

/** A tutorial for use in VSCode CodeRoad */
export type TutorialVersionArgs = {
	version?: Maybe<Scalars['ID']>
}

/** Configure environment in editor for git, testing & parsing files */
export type TutorialConfig = {
	__typename?: 'TutorialConfig'
	testRunner: TutorialTestRunner
	repo: TutorialRepo
}

/** Data for tutorial */
export type TutorialData = {
	__typename?: 'TutorialData'
	config: TutorialConfig
	levels: Array<Level>
}

export type TutorialProgressStatus = 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED'

export type TutorialProgressType = 'LEVEL' | 'STEP' | 'TUTORIAL'

/** Repo referenced by commmits in the tutorial */
export type TutorialRepo = {
	__typename?: 'TutorialRepo'
	uri: Scalars['String']
	branch: Scalars['String']
	name?: Maybe<Scalars['String']>
	owner?: Maybe<Scalars['String']>
}

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

export type TutorialTestRunner = {
	__typename?: 'TutorialTestRunner'
	command: Scalars['String']
	fileFormats?: Maybe<Array<FileFormat>>
}

/** A version of a tutorial */
export type TutorialVersion = {
	__typename?: 'TutorialVersion'
	version: Scalars['ID']
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
	githubUser?: Maybe<GithubUser>
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
	subscribe: SubscriptionSubscribeFn<{[key in TKey]: TResult}, TParent, TContext, TArgs>
	resolve?: SubscriptionResolveFn<TResult, {[key in TKey]: TResult}, TContext, TArgs>
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
	TutorialVersion: ResolverTypeWrapper<TutorialVersion>
	DateTime: ResolverTypeWrapper<Scalars['DateTime']>
	User: ResolverTypeWrapper<User>
	String: ResolverTypeWrapper<Scalars['String']>
	GithubUser: ResolverTypeWrapper<GithubUser>
	TutorialData: ResolverTypeWrapper<TutorialData>
	TutorialConfig: ResolverTypeWrapper<TutorialConfig>
	TutorialTestRunner: ResolverTypeWrapper<TutorialTestRunner>
	FileFormat: FileFormat
	TutorialRepo: ResolverTypeWrapper<TutorialRepo>
	Level: ResolverTypeWrapper<Level>
	Step: ResolverTypeWrapper<Step>
	StepActions: ResolverTypeWrapper<StepActions>
	Sha1: ResolverTypeWrapper<Scalars['Sha1']>
	TutorialSummary: ResolverTypeWrapper<TutorialSummary>
	tutorialRepoInput: TutorialRepoInput
	Commit: ResolverTypeWrapper<Commit>
	Mutation: ResolverTypeWrapper<{}>
	editorLoginInput: EditorLoginInput
	Editor: Editor
	editorLoginOutput: ResolverTypeWrapper<EditorLoginOutput>
	updateTutorialProgressInput: UpdateTutorialProgressInput
	TutorialProgressType: TutorialProgressType
	TutorialProgressStatus: TutorialProgressStatus
	Boolean: ResolverTypeWrapper<Scalars['Boolean']>
	createTutorialInput: CreateTutorialInput
	createTutorialVersionInput: CreateTutorialVersionInput
	updateTutorialVersionInput: UpdateTutorialVersionInput
	JSON: ResolverTypeWrapper<Scalars['JSON']>
	JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>
	Role: Role
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Query: {}
	ID: Scalars['ID']
	Tutorial: Tutorial
	TutorialVersion: TutorialVersion
	DateTime: Scalars['DateTime']
	User: User
	String: Scalars['String']
	GithubUser: GithubUser
	TutorialData: TutorialData
	TutorialConfig: TutorialConfig
	TutorialTestRunner: TutorialTestRunner
	FileFormat: FileFormat
	TutorialRepo: TutorialRepo
	Level: Level
	Step: Step
	StepActions: StepActions
	Sha1: Scalars['Sha1']
	TutorialSummary: TutorialSummary
	tutorialRepoInput: TutorialRepoInput
	Commit: Commit
	Mutation: {}
	editorLoginInput: EditorLoginInput
	Editor: Editor
	editorLoginOutput: EditorLoginOutput
	updateTutorialProgressInput: UpdateTutorialProgressInput
	TutorialProgressType: TutorialProgressType
	TutorialProgressStatus: TutorialProgressStatus
	Boolean: Scalars['Boolean']
	createTutorialInput: CreateTutorialInput
	createTutorialVersionInput: CreateTutorialVersionInput
	updateTutorialVersionInput: UpdateTutorialVersionInput
	JSON: Scalars['JSON']
	JSONObject: Scalars['JSONObject']
	Role: Role
}

export type AuthDirectiveResolver<
	Result,
	Parent,
	ContextType = any,
	Args = {requires?: Maybe<Maybe<Role>>}
	> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type CommitResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Commit'] = ResolversParentTypes['Commit']
	> = {
		id?: Resolver<ResolversTypes['Sha1'], ParentType, ContextType>
		message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
		username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
	}

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
		description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
		content?: Resolver<ResolversTypes['String'], ParentType, ContextType>
		steps?: Resolver<Array<ResolversTypes['Step']>, ParentType, ContextType>
		setup?: Resolver<Maybe<ResolversTypes['StepActions']>, ParentType, ContextType>
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
		commits?: Resolver<
			Array<Maybe<ResolversTypes['Commit']>>,
			ParentType,
			ContextType,
			RequireFields<QueryCommitsArgs, 'input'>
		>
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
		setup?: Resolver<ResolversTypes['StepActions'], ParentType, ContextType>
		solution?: Resolver<ResolversTypes['StepActions'], ParentType, ContextType>
	}

export type StepActionsResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['StepActions'] = ResolversParentTypes['StepActions']
	> = {
		id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
		commits?: Resolver<Array<ResolversTypes['Sha1']>, ParentType, ContextType>
		files?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>
		commands?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>
		watchers?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>
	}

export type TutorialResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Tutorial'] = ResolversParentTypes['Tutorial']
	> = {
		id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
		latestVersionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
		version?: Resolver<ResolversTypes['TutorialVersion'], ParentType, ContextType, TutorialVersionArgs>
		versions?: Resolver<Array<ResolversTypes['TutorialVersion']>, ParentType, ContextType>
		summary?: Resolver<ResolversTypes['TutorialSummary'], ParentType, ContextType>
	}

export type TutorialConfigResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['TutorialConfig'] = ResolversParentTypes['TutorialConfig']
	> = {
		testRunner?: Resolver<ResolversTypes['TutorialTestRunner'], ParentType, ContextType>
		repo?: Resolver<ResolversTypes['TutorialRepo'], ParentType, ContextType>
	}

export type TutorialDataResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['TutorialData'] = ResolversParentTypes['TutorialData']
	> = {
		config?: Resolver<ResolversTypes['TutorialConfig'], ParentType, ContextType>
		levels?: Resolver<Array<ResolversTypes['Level']>, ParentType, ContextType>
	}

export type TutorialRepoResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['TutorialRepo'] = ResolversParentTypes['TutorialRepo']
	> = {
		uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>
		branch?: Resolver<ResolversTypes['String'], ParentType, ContextType>
		name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
		owner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
	}

export type TutorialSummaryResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['TutorialSummary'] = ResolversParentTypes['TutorialSummary']
	> = {
		title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
		description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
	}

export type TutorialTestRunnerResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['TutorialTestRunner'] = ResolversParentTypes['TutorialTestRunner']
	> = {
		command?: Resolver<ResolversTypes['String'], ParentType, ContextType>
		fileFormats?: Resolver<Maybe<Array<ResolversTypes['FileFormat']>>, ParentType, ContextType>
	}

export type TutorialVersionResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['TutorialVersion'] = ResolversParentTypes['TutorialVersion']
	> = {
		version?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
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
		githubUser?: Resolver<Maybe<ResolversTypes['GithubUser']>, ParentType, ContextType>
	}

export type Resolvers<ContextType = any> = {
	Commit?: CommitResolvers<ContextType>
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
	StepActions?: StepActionsResolvers<ContextType>
	Tutorial?: TutorialResolvers<ContextType>
	TutorialConfig?: TutorialConfigResolvers<ContextType>
	TutorialData?: TutorialDataResolvers<ContextType>
	TutorialRepo?: TutorialRepoResolvers<ContextType>
	TutorialSummary?: TutorialSummaryResolvers<ContextType>
	TutorialTestRunner?: TutorialTestRunnerResolvers<ContextType>
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

export interface IntrospectionResultData {
	__schema: {
		types: {
			kind: string
			name: string
			possibleTypes: {
				name: string
			}[]
		}[]
	}
}
