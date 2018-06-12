/*
 *  Entry point for the lambda.  This contains all of our handlers.
 */

'use strict';

const Alexa = require('ask-sdk-core');

//Responses
const WELCOME_MESSAGE = "Tell me how long you want to meditate for";
const ERROR_MESSAGE = "Sorry, I can't help with that.";
const HELP_MESSAGE = "I'll play a random meditation for you based on how much time you have." +
    "Say something like I want to meditate for ten minutes.";
const REPROMPT = "Say something like I want to meditate for ten minutes.";

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(WELCOME_MESSAGE)
            .reprompt(REPROMPT)
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(ERROR_MESSAGE)
            .reprompt(REPROMPT)
            .getResponse();
    }
};

const CancelIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(HELP_MESSAGE)
            .reprompt(REPROMPT)
            .getResponse();
    }
};

const StopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .getResponse();
    }
};

const PauseIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PauseIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .getResponse();
    }
};

const ResumeIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ResumeIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .getResponse();
    }
};

const LoopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.LoopOnIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.LoopOffIntent');
    },
    handle(handlerInput) {
        const speechText = "Presence can't loop meditations yet.";
        return handlerInput.responseBuilder()
            .speak(speechText)
            .getResponse();
    }
};

const NextIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NextIntent';
    },
    handle(handlerInput) {
        const speechText = "Presence cannot move between meditations yet.";
        return handlerInput.responseBuilder()
            .speak(speechText)
            .getResponse();
    }
};

const PreviousIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PreviousIntent';
    },
    handle(handlerInput) {
        const speechText = "Presence cannot move between meditations yet.";
        return handlerInput.responseBuilder()
            .speak(speechText)
            .getResponse();
    }
};

const RepeatIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent';
    },
    handle(handlerInput) {
        const speechText = "Presence cannot repeat meditations yet.";
        return handlerInput.responseBuilder()
            .speak(speechText)
            .getResponse();
    }
};

const ShuffleIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ShuffleOffIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ShuffleOnIntent');
    },
    handle(handlerInput) {
        const speechText = "Presence cannot shuffle meditations.";
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};

const StartOverIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StartOverIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .getResponse();
    }
};

const StartMediationIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.reqeust.intent.name === 'AMAZON.StartMeditationIntent';
    },
    handle(handlerInput) {
        const url = "https://s3.amazonaws.com/myrobyn.meditations/001-10.mp3";
        const playBehavior = 'REPLACE_ALL';

        return handlerInput.responseBuilder
            .addAudioPlayerPlayDirective(playBehavior, url, "", 0)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(LaunchRequestHandler,
        FallbackIntentHandler,
        CancelIntentHandler,
        HelpIntentHandler,
        StopIntentHandler,
        PauseIntentHandler,
        ResumeIntentHandler,
        LoopIntentHandler,
        NextIntentHandler,
        PreviousIntentHandler,
        RepeatIntentHandler,
        ShuffleIntentHandler,
        StartOverIntentHandler,
        StartMediationIntentHandler,
        SessionEndedRequestHandler)
    .lambda();