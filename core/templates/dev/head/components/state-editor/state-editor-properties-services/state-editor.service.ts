// Copyright 2014 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview A service that maintains a record of the objects exclusive to
 * a state.
 */

require(
  'pages/exploration-editor-page/editor-tab/services/' +
  'solution-validity.service.ts');

oppia.factory('StateEditorService', [
  '$log', 'SolutionValidityService',
  function(
      $log, SolutionValidityService) {
    var activeStateName = null;
    var stateNames = [];
    var correctnessFeedbackEnabled = null;
    var inQuestionMode = null;
    // Currently, the only place where this is used in the state editor
    // is in solution verification. So, once the interaction is set in this
    // service, the given solutions would be automatically verified for the set
    // interaction.
    var interaction = null;
    var misconceptions = [];
    var explorationIsWhitelisted = false;
    var solicitAnswerDetails = null;

    return {
      getActiveStateName: function() {
        return activeStateName;
      },
      setActiveStateName: function(newActiveStateName) {
        if (newActiveStateName === '' || newActiveStateName === null) {
          $log.error('Invalid active state name: ' + newActiveStateName);
          return;
        }
        activeStateName = newActiveStateName;
      },
      isExplorationWhitelisted: function() {
        return explorationIsWhitelisted;
      },
      updateExplorationWhitelistedStatus: function(value) {
        explorationIsWhitelisted = value;
      },
      setMisconceptions: function(newMisconceptions) {
        misconceptions = newMisconceptions;
      },
      getMisconceptions: function() {
        return angular.copy(misconceptions);
      },
      setInteraction: function(newInteraction) {
        interaction = newInteraction;
      },
      setInteractionId: function(newId) {
        interaction.setId(newId);
      },
      setInteractionAnswerGroups: function(newAnswerGroups) {
        interaction.setAnswerGroups(newAnswerGroups);
      },
      setInteractionDefaultOutcome: function(newOutcome) {
        interaction.setDefaultOutcome(newOutcome);
      },
      setInteractionCustomizationArgs: function(newArgs) {
        interaction.setCustomizationArgs(newArgs);
      },
      setInteractionSolution: function(solution) {
        interaction.setSolution(solution);
      },
      setInteractionHints: function(hints) {
        interaction.setHints(hints);
      },
      getInteraction: function() {
        return angular.copy(interaction);
      },
      getAnswerChoices: function(interactionId, customizationArgs) {
        if (!interactionId) {
          return null;
        }
        // Special cases for multiple choice input and image click input.
        if (interactionId === 'MultipleChoiceInput') {
          return customizationArgs.choices.value.map(
            function(val, ind) {
              return {
                val: ind,
                label: val
              };
            }
          );
        } else if (interactionId === 'ImageClickInput') {
          var _answerChoices = [];
          var imageWithRegions =
            customizationArgs.imageAndRegions.value;
          for (
            var j = 0; j < imageWithRegions.labeledRegions.length; j++) {
            _answerChoices.push({
              val: imageWithRegions.labeledRegions[j].label,
              label: imageWithRegions.labeledRegions[j].label
            });
          }
          return _answerChoices;
        } else if (interactionId === 'ItemSelectionInput' ||
            interactionId === 'DragAndDropSortInput') {
          return customizationArgs.choices.value.map(function(val) {
            return {
              val: val,
              label: val
            };
          });
        } else {
          return null;
        }
      },
      setInQuestionMode: function(newModeValue) {
        inQuestionMode = newModeValue;
      },
      isInQuestionMode: function() {
        return inQuestionMode;
      },
      setCorrectnessFeedbackEnabled: function(newCorrectnessFeedbackEnabled) {
        correctnessFeedbackEnabled = newCorrectnessFeedbackEnabled;
      },
      getCorrectnessFeedbackEnabled: function() {
        return correctnessFeedbackEnabled;
      },
      setSolicitAnswerDetails: function(newSolicitAnswerDetails) {
        solicitAnswerDetails = newSolicitAnswerDetails;
      },
      getSolicitAnswerDetails: function() {
        return solicitAnswerDetails;
      },
      setStateNames: function(newStateNames) {
        stateNames = newStateNames;
      },
      getStateNames: function() {
        return stateNames;
      },
      isCurrentSolutionValid: function() {
        return SolutionValidityService.isSolutionValid(activeStateName);
      },
      deleteCurrentSolutionValidity: function() {
        SolutionValidityService.deleteSolutionValidity(activeStateName);
      }
    };
  }]);
