import fetch from 'node-fetch'
import logger from '../logger'

const WEBHOOKS = {
  init: true,
  reset: true,
  step_complete: true,
  level_complete: true,
  tutorial_complete: true,
}

const callWebhookEndpoint = async <B>(bodyObject: B): Promise<void> => {
  const endpoint = 'http://localhost:3000'
  const body = JSON.stringify(bodyObject)
  try {
    const sendEvent = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    })
    if (!sendEvent.ok) {
      throw new Error('Error sending event')
    }
  } catch (err: unknown) {
    logger(`Failed to call webhook endpoint ${endpoint} with body ${body}`)
  }
}

type InitEvent = {
  // tutorialId: string;
  version: string
}

export const onInit = (event: InitEvent): void => {
  if (WEBHOOKS.init) {
    callWebhookEndpoint<InitEvent>(event)
  }
}

type ResetEvent = {
  // tutorialId: string;
  version: string
}

export const onReset = (event: ResetEvent): void => {
  if (WEBHOOKS.reset) {
    callWebhookEndpoint<ResetEvent>(event)
  }
}

type StepCompleteEvent = { tutorialId: string; version: string; levelId: string; stepId: string }

export const onStepComplete = (event: StepCompleteEvent): void => {
  if (WEBHOOKS.step_complete) {
    callWebhookEndpoint<StepCompleteEvent>(event)
  }
}

type LevelCompleteEvent = { tutorialId: string; version: string; levelId: string }

export const onLevelComplete = (event: LevelCompleteEvent): void => {
  if (WEBHOOKS.level_complete) {
    callWebhookEndpoint<LevelCompleteEvent>(event)
  }
}

type TutorialCompleteEvent = { tutorialId: string; version: string }

export const onTutorialComplete = (event: TutorialCompleteEvent): void => {
  if (WEBHOOKS.tutorial_complete) {
    callWebhookEndpoint<TutorialCompleteEvent>(event)
  }
}
