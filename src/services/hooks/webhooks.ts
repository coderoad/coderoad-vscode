import * as TT from 'typings/tutorial'
import fetch from 'node-fetch'
import logger from '../logger'
import { WEBHOOK_TOKEN } from '../../environment'

const WEBHOOK_EVENTS = {
  init: false,
  reset: false,
  step_complete: false,
  level_complete: false,
  tutorial_complete: false,
}

// varaibles set on init
let WEBHOOK_URI: string | undefined

export const setupWebhook = (webhookConfig: TT.WebhookConfig) => {
  if (!webhookConfig.url) {
    return
  }
  // set webhook uri
  WEBHOOK_URI = webhookConfig.url

  // set webhook event triggers
  const events = webhookConfig.events as TT.WebhookConfigEvents
  for (const eventName of Object.keys(events || {})) {
    WEBHOOK_EVENTS[eventName] = events[eventName]
  }
}

const callWebhookEndpoint = async <B>(bodyObject: B): Promise<void> => {
  if (!WEBHOOK_URI) {
    return
  }

  const headers = { 'Content-Type': 'application/json' }
  // if the webhook token is specified as env var, sends a token with the request
  if (WEBHOOK_TOKEN) {
    headers['CodeRoad-User-Token'] = WEBHOOK_TOKEN
  }

  const body = JSON.stringify(bodyObject)

  try {
    const sendEvent = await fetch(WEBHOOK_URI, {
      method: 'POST',
      headers,
      body,
    })
    if (!sendEvent.ok) {
      throw new Error('Error sending event')
    }
  } catch (err: unknown) {
    logger(`Failed to call webhook endpoint ${WEBHOOK_URI} with body ${body}`)
  }
}

type WebhookEventInit = {
  tutorialId: string
  coderoadVersion: string
}

export const onInit = (event: WebhookEventInit): void => {
  if (WEBHOOK_EVENTS.init) {
    callWebhookEndpoint<WebhookEventInit>(event)
  }
}

type WebhookEventReset = {
  tutorialId: string
}

export const onReset = (event: WebhookEventReset): void => {
  if (WEBHOOK_EVENTS.reset) {
    callWebhookEndpoint<WebhookEventReset>(event)
  }
}

type WebhookEventStepComplete = { tutorialId: string; version?: string; levelId: string; stepId: string }

export const onStepComplete = (event: WebhookEventStepComplete): void => {
  if (WEBHOOK_EVENTS.step_complete) {
    callWebhookEndpoint<WebhookEventStepComplete>(event)
  }
}

type WebhookEventLevelComplete = { tutorialId: string; version?: string; levelId: string }

export const onLevelComplete = (event: WebhookEventLevelComplete): void => {
  if (WEBHOOK_EVENTS.level_complete) {
    callWebhookEndpoint<WebhookEventLevelComplete>(event)
  }
}

type WebhookEventTutorialComplete = { tutorialId: string; version?: string }

export const onTutorialComplete = (event: WebhookEventTutorialComplete): void => {
  if (WEBHOOK_EVENTS.tutorial_complete) {
    callWebhookEndpoint<WebhookEventTutorialComplete>(event)
  }
}
