/*
Copyright 2021 Expedia, Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    https://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { PipelineState } from '../types';
import { context as githubContext } from '@actions/github';
import { map } from 'bluebird';
import { octokit } from '../octokit';

interface SetCommitStatus {
  sha: string;
  context: string;
  state: PipelineState;
  description?: string;
  target_url?: string;
}

export const setCommitStatus = ({ sha, context, state, description, target_url }: SetCommitStatus) =>
  map(context.split('\n'), context =>
    octokit.repos.createCommitStatus({
      sha,
      context,
      state,
      description,
      target_url,
      ...githubContext.repo
    })
  );
