import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string,
    String: string,
    Boolean: boolean,
    Int: number,
    Float: number,
    /** 
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the
     * `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO
     * 8601 standard for representation of dates and times using the Gregorian calendar.
   **/
    DateTime: any,
    /** Git commit hash */
    Commit: any,
    /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
    JSON: any,
    /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
    JSONObject: any,
    /** The `Upload` scalar type represents a file upload. */
    Upload: any,
};



export type AuthenticateUserPayload = {
    __typename?: 'AuthenticateUserPayload',
    user: User,
    token: Scalars['String'],
};

export enum CacheControlScope {
    Public = 'PUBLIC',
    Private = 'PRIVATE'
}



export enum EnumCodingLanguage {
    Javascript = 'JAVASCRIPT'
}

export enum EnumTestRunner {
    Jest = 'JEST'
}

export type GithubUser = {
    __typename?: 'GithubUser',
    id: Scalars['ID'],
    name?: Maybe<Scalars['String']>,
    email?: Maybe<Scalars['String']>,
    location?: Maybe<Scalars['String']>,
    avatarUrl?: Maybe<Scalars['String']>,
};



export type Level = {
    __typename?: 'Level',
    id: Scalars['ID'],
    title?: Maybe<Scalars['String']>,
    text?: Maybe<Scalars['String']>,
    stages?: Maybe<Array<Maybe<Stage>>>,
    setup?: Maybe<StepActions>,
    status?: 'INCOMPLETE' | 'COMPLETE' | 'ACTIVE',
};

export type Mutation = {
    __typename?: 'Mutation',
    authenticate?: Maybe<AuthenticateUserPayload>,
};


export type MutationAuthenticateArgs = {
    accessToken: Scalars['String']
};

export type Query = {
    __typename?: 'Query',
    tutorial?: Maybe<Tutorial>,
    tutorials?: Maybe<Array<Maybe<Tutorial>>>,
    user?: Maybe<User>,
    level?: Maybe<Level>,
    stage?: Maybe<Stage>,
    step?: Maybe<Step>,
    stepActions?: Maybe<StepActions>,
};


export type QueryTutorialArgs = {
    id: Scalars['ID']
};


export type QueryLevelArgs = {
    id: Scalars['ID']
};


export type QueryStageArgs = {
    id: Scalars['ID']
};


export type QueryStepArgs = {
    id: Scalars['ID']
};


export type QueryStepActionsArgs = {
    id: Scalars['ID']
};

export enum Role {
    Admin = 'ADMIN',
    User = 'USER'
}

export type Stage = {
    __typename?: 'Stage',
    id: Scalars['ID'],
    title?: Maybe<Scalars['String']>,
    text?: Maybe<Scalars['String']>,
    steps?: Maybe<Array<Maybe<Step>>>,
    setup?: Maybe<StepActions>,
    status?: 'INCOMPLETE' | 'COMPLETE' | 'ACTIVE',
};

export type Step = {
    __typename?: 'Step',
    id: Scalars['ID'],
    title?: Maybe<Scalars['String']>,
    text?: Maybe<Scalars['String']>,
    setup?: Maybe<StepActions>,
    solution?: Maybe<StepActions>,
    status?: 'INCOMPLETE' | 'COMPLETE' | 'ACTIVE'
};

export type StepActions = {
    __typename?: 'StepActions',
    id: Scalars['ID'],
    commits?: Maybe<Array<Maybe<Scalars['Commit']>>>,
    files?: Maybe<Array<Maybe<Scalars['String']>>>,
    commands?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type Tutorial = {
    __typename?: 'Tutorial',
    id: Scalars['ID'],
    repo?: Maybe<TutorialRepo>,
    createdBy?: Maybe<User>,
    createdAt?: Maybe<Scalars['DateTime']>,
    updatedBy?: Maybe<User>,
    updatedAt?: Maybe<Scalars['DateTime']>,
    codingLanguage?: Maybe<EnumCodingLanguage>,
    testRunner?: Maybe<EnumTestRunner>,
    title?: Maybe<Scalars['String']>,
    text?: Maybe<Scalars['String']>,
    releasedAt?: Maybe<Scalars['DateTime']>,
    releasedBy?: Maybe<User>,
    version?: Maybe<TutorialVersion>,
    versions?: Maybe<Array<Maybe<TutorialVersion>>>,
};

export type TutorialRepo = {
    __typename?: 'TutorialRepo',
    tutorialId: Scalars['ID'],
    uri?: Maybe<Scalars['String']>,
    branch?: Maybe<Scalars['String']>,
    name?: Maybe<Scalars['String']>,
    owner?: Maybe<Scalars['String']>,
};

export type TutorialVersion = {
    __typename?: 'TutorialVersion',
    tutorialId: Scalars['ID'],
    version: Scalars['String'],
    coderoadVersion?: Maybe<Scalars['String']>,
    createdAt?: Maybe<Scalars['DateTime']>,
    createdBy?: Maybe<User>,
    publishedAt?: Maybe<Scalars['DateTime']>,
    publishedBy?: Maybe<User>,
    levels?: Maybe<Array<Maybe<Level>>>,
};


export type User = {
    __typename?: 'User',
    id: Scalars['ID'],
    name?: Maybe<Scalars['String']>,
    email?: Maybe<Scalars['String']>,
    location?: Maybe<Scalars['String']>,
    avatarUrl?: Maybe<Scalars['String']>,
    createdAt?: Maybe<Scalars['DateTime']>,
    updatedAt?: Maybe<Scalars['DateTime']>,
    githubUser?: Maybe<GithubUser>,
};
export type TutorialSummaryFragment = (
    { __typename?: 'Tutorial' }
    & Pick<Tutorial, 'title' | 'text'>
);

