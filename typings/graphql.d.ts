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

export type CreateTokenInput = {
	accessToken: Scalars['String']
}

export type CreateTutorialSummaryInput = {
	title: Scalars['String']
	description: Scalars['String']
}

export type CreateTutorialVersionInput = {
	data: Scalars['JSON']
}

export type CreateTutorialVersionOutput = {
	__typename?: 'createTutorialVersionOutput'
	success?: Maybe<Scalars['Boolean']>
}

export type Editor = 'VSCODE'

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

export type FileFormat = 'JS' | 'JSON' | 'JSX' | 'TS' | 'TSX'

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
	/** Create a new tutorial */
	createTutorialVersion?: Maybe<CreateTutorialVersionOutput>
}

export type MutationEditorLoginArgs = {
	input: EditorLoginInput
}

export type MutationCreateTutorialVersionArgs = {
	input: CreateTutorialVersionInput
}

export type Query = {
	__typename?: 'Query'
	tutorial?: Maybe<Tutorial>
	tutorials?: Maybe<Array<Maybe<Tutorial>>>
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
	listeners?: Maybe<Array<Scalars['String']>>
}

export type TestRunner = 'JEST'

/** A tutorial for use in VSCode CodeRoad */
export type Tutorial = {
	__typename?: 'Tutorial'
	id: Scalars['ID']
	createdBy: User
	createdAt: Scalars['DateTime']
	version: TutorialVersion
	versions: Array<TutorialVersion>
	completed?: Maybe<Scalars['Boolean']>
}

/** A tutorial for use in VSCode CodeRoad */
export type TutorialVersionArgs = {
	version?: Maybe<Scalars['String']>
}

/** Configure environment in editor for git, testing & parsing files */
export type TutorialConfig = {
	__typename?: 'TutorialConfig'
	testRunner: TestRunner
	fileFormats: Array<FileFormat>
	repo: TutorialRepo
}

/** Data for tutorial */
export type TutorialData = {
	__typename?: 'TutorialData'
	config: TutorialConfig
	init?: Maybe<TutorialInit>
	levels: Array<Level>
}

/** Data that loads on startup */
export type TutorialInit = {
	__typename?: 'TutorialInit'
	setup?: Maybe<StepActions>
}

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

/** A version of a tutorial */
export type TutorialVersion = {
	__typename?: 'TutorialVersion'
	tutorialId: Scalars['ID']
	version: Scalars['String']
	createdAt: Scalars['DateTime']
	createdBy: User
	updatedBy: User
	updatedAt: Scalars['DateTime']
	publishedAt?: Maybe<Scalars['DateTime']>
	publishedBy?: Maybe<User>
	summary: TutorialSummary
	data: TutorialData
	completed?: Maybe<Scalars['Boolean']>
}

/**
 * Users is useful for tracking completion progress
 * & credit for tutorial creation/contributions
 **/
export type User = {
	__typename?: 'User'
	id: Scalars['ID']
	name?: Maybe<Scalars['String']>
	email?: Maybe<Scalars['String']>
	location?: Maybe<Scalars['String']>
	avatarUrl?: Maybe<Scalars['String']>
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
	User: ResolverTypeWrapper<User>
	String: ResolverTypeWrapper<Scalars['String']>
	DateTime: ResolverTypeWrapper<Scalars['DateTime']>
	GithubUser: ResolverTypeWrapper<GithubUser>
	TutorialVersion: ResolverTypeWrapper<TutorialVersion>
	TutorialSummary: ResolverTypeWrapper<TutorialSummary>
	TutorialData: ResolverTypeWrapper<TutorialData>
	TutorialConfig: ResolverTypeWrapper<TutorialConfig>
	TestRunner: TestRunner
	FileFormat: FileFormat
	TutorialRepo: ResolverTypeWrapper<TutorialRepo>
	TutorialInit: ResolverTypeWrapper<TutorialInit>
	StepActions: ResolverTypeWrapper<StepActions>
	Sha1: ResolverTypeWrapper<Scalars['Sha1']>
	Level: ResolverTypeWrapper<Level>
	Step: ResolverTypeWrapper<Step>
	Boolean: ResolverTypeWrapper<Scalars['Boolean']>
	tutorialRepoInput: TutorialRepoInput
	Commit: ResolverTypeWrapper<Commit>
	Mutation: ResolverTypeWrapper<{}>
	editorLoginInput: EditorLoginInput
	Editor: Editor
	editorLoginOutput: ResolverTypeWrapper<EditorLoginOutput>
	createTutorialVersionInput: CreateTutorialVersionInput
	JSON: ResolverTypeWrapper<Scalars['JSON']>
	createTutorialVersionOutput: ResolverTypeWrapper<CreateTutorialVersionOutput>
	JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>
	Role: Role
	createTokenInput: CreateTokenInput
	createTutorialSummaryInput: CreateTutorialSummaryInput
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Query: {}
	ID: Scalars['ID']
	Tutorial: Tutorial
	User: User
	String: Scalars['String']
	DateTime: Scalars['DateTime']
	GithubUser: GithubUser
	TutorialVersion: TutorialVersion
	TutorialSummary: TutorialSummary
	TutorialData: TutorialData
	TutorialConfig: TutorialConfig
	TestRunner: TestRunner
	FileFormat: FileFormat
	TutorialRepo: TutorialRepo
	TutorialInit: TutorialInit
	StepActions: StepActions
	Sha1: Scalars['Sha1']
	Level: Level
	Step: Step
	Boolean: Scalars['Boolean']
	tutorialRepoInput: TutorialRepoInput
	Commit: Commit
	Mutation: {}
	editorLoginInput: EditorLoginInput
	Editor: Editor
	editorLoginOutput: EditorLoginOutput
	createTutorialVersionInput: CreateTutorialVersionInput
	JSON: Scalars['JSON']
	createTutorialVersionOutput: CreateTutorialVersionOutput
	JSONObject: Scalars['JSONObject']
	Role: Role
	createTokenInput: CreateTokenInput
	createTutorialSummaryInput: CreateTutorialSummaryInput
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

export type CreateTutorialVersionOutputResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['createTutorialVersionOutput'] = ResolversParentTypes['createTutorialVersionOutput']
	> = {
		success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
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
		createTutorialVersion?: Resolver<
			Maybe<ResolversTypes['createTutorialVersionOutput']>,
			ParentType,
			ContextType,
			RequireFields<MutationCreateTutorialVersionArgs, 'input'>
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
		tutorials?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tutorial']>>>, ParentType, ContextType>
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
		listeners?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>
	}

export type TutorialResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Tutorial'] = ResolversParentTypes['Tutorial']
	> = {
		id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
		createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>
		createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
		version?: Resolver<ResolversTypes['TutorialVersion'], ParentType, ContextType, TutorialVersionArgs>
		versions?: Resolver<Array<ResolversTypes['TutorialVersion']>, ParentType, ContextType>
		completed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
	}

export type TutorialConfigResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['TutorialConfig'] = ResolversParentTypes['TutorialConfig']
	> = {
		testRunner?: Resolver<ResolversTypes['TestRunner'], ParentType, ContextType>
		fileFormats?: Resolver<Array<ResolversTypes['FileFormat']>, ParentType, ContextType>
		repo?: Resolver<ResolversTypes['TutorialRepo'], ParentType, ContextType>
	}

export type TutorialDataResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['TutorialData'] = ResolversParentTypes['TutorialData']
	> = {
		config?: Resolver<ResolversTypes['TutorialConfig'], ParentType, ContextType>
		init?: Resolver<Maybe<ResolversTypes['TutorialInit']>, ParentType, ContextType>
		levels?: Resolver<Array<ResolversTypes['Level']>, ParentType, ContextType>
	}

export type TutorialInitResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['TutorialInit'] = ResolversParentTypes['TutorialInit']
	> = {
		setup?: Resolver<Maybe<ResolversTypes['StepActions']>, ParentType, ContextType>
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

export type TutorialVersionResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['TutorialVersion'] = ResolversParentTypes['TutorialVersion']
	> = {
		tutorialId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
		version?: Resolver<ResolversTypes['String'], ParentType, ContextType>
		createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
		createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>
		updatedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>
		updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
		publishedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>
		publishedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
		summary?: Resolver<ResolversTypes['TutorialSummary'], ParentType, ContextType>
		data?: Resolver<ResolversTypes['TutorialData'], ParentType, ContextType>
		completed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
	}

export type UserResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
	> = {
		id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
		name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
		email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
		location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
		avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
		createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
		updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
		githubUser?: Resolver<Maybe<ResolversTypes['GithubUser']>, ParentType, ContextType>
	}

export type Resolvers<ContextType = any> = {
	Commit?: CommitResolvers<ContextType>
	createTutorialVersionOutput?: CreateTutorialVersionOutputResolvers<ContextType>
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
	TutorialInit?: TutorialInitResolvers<ContextType>
	TutorialRepo?: TutorialRepoResolvers<ContextType>
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
