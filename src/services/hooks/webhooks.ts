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

type WebhookEventInit = {
  tutorialId: string
  coderoadVersion: string
}

export const onInit = (event: WebhookEventInit): void => {
  if (WEBHOOKS.init) {
    callWebhookEndpoint<WebhookEventInit>(event)
  }
}

type WebhookEventReset = {
  tutorialId: string
}

export const onReset = (event: WebhookEventReset): void => {
  if (WEBHOOKS.reset) {
    callWebhookEndpoint<WebhookEventReset>(event)
  }
}

type WebhookEventStepComplete = { tutorialId: string; version: string; levelId: string; stepId: string }

export const onStepComplete = (event: WebhookEventStepComplete): void => {
  if (WEBHOOKS.step_complete) {
    callWebhookEndpoint<WebhookEventStepComplete>(event)
  }
}

type WebhookEventLevelComplete = { tutorialId: string; version: string; levelId: string }

export const onLevelComplete = (event: WebhookEventLevelComplete): void => {
  if (WEBHOOKS.level_complete) {
    callWebhookEndpoint<WebhookEventLevelComplete>(event)
  }
}

type WebhookEevntTutorialComplete = { tutorialId: string; version: string }

export const onTutorialComplete = (event: WebhookEevntTutorialComplete): void => {
  if (WEBHOOKS.tutorial_complete) {
    callWebhookEndpoint<WebhookEevntTutorialComplete>(event)
  }
}
