import {useRef, useState} from 'react';
import {request} from '@octokit/request';
import {Endpoints} from '@octokit/types';
import Modal from '../../components/modal';
import {RouteComponentProps} from '@reach/router';

type listReposResponse =
  Endpoints['GET /users/{username}/repos']['response']['data'];

export const HomePage: React.FC<RouteComponentProps> = () => {
  const [repos, setRepos] = useState<listReposResponse>([]);
  const [readme, setReadme] = useState<any>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);

  const onSearch = async (event: any) => {
    const username = inputRef?.current?.value;
    if (event.key === 'Enter' && username) {
      const repos = await request('GET /users/{username}/repos', {
        username,
      });
      setRepos(repos.data);
    }
  };

  const getContent = (url: string) => {
    fetch(url)
      .then(response => response.text())
      .then(res => {
        setReadme(res);
      });
  };

  const getReadme = async (repo: listReposResponse[0]) => {
    setShowModal(true);
    const readme = await request('GET /repos/{owner}/{repo}/readme', {
      owner: repo.owner.login,
      repo: repo.name,
    });

    if (readme.data.download_url) getContent(readme.data.download_url);
  };

  return (
    <div className="bg-white">
      <header>
        <div className="container mx-auto px-6 py-3">
          <nav className="sm:flex sm:justify-center sm:items-center mt-4">
            <div className="flex flex-col sm:flex-row">
              <h1 className="mt-3 text-gray-600  sm:mx-3 sm:mt-0">
                Find repositories by username
              </h1>
            </div>
          </nav>
          <div className="relative mt-6 max-w-lg mx-auto">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none">
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <input
              className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter username github"
              ref={inputRef}
              onKeyPress={onSearch}
            />
          </div>
        </div>
      </header>
      <main className="my-8">
        <div className="container mx-auto px-6">
          <h3 className="text-gray-700 text-2xl font-medium">Total search</h3>
          <span className="mt-3 text-sm text-gray-500">
            {repos.length} repositories
          </span>
          <div className="grid gap-6 grid-cols-1 mt-6 p-2">
            {repos &&
              repos.length > 0 &&
              repos.map(repo => {
                return (
                  <div
                    key={repo.id}
                    className="lg:flex shadow rounded-lg border border-gray-400 p-1">
                    <div className="w-full  lg:w-11/12 xl:w-full px-1 bg-white py-5 lg:px-2 lg:py-2 tracking-wide">
                      <div className="flex flex-row lg:justify-start justify-center">
                        <div className="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
                          CreateAt : {repo.created_at}
                        </div>
                        <div className="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
                          UpdatedAt : {repo.updated_at}
                        </div>
                      </div>
                      <div className="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
                        {repo.name}
                      </div>

                      <div className="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
                        {repo.description}
                      </div>
                    </div>
                    <div className="flex flex-row items-center w-full lg:w-1/3 bg-white lg:justify-end justify-center px-2 py-4 lg:px-0">
                      <span
                        className=" cursor-pointer tracking-wider text-gray-600 bg-gray-200 px-2 text-sm rounded leading-loose mx-2 font-semibold hover:bg-slate-400 hover:text-white"
                        onClick={() => getReadme(repo)}>
                        Readme
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        content={readme}
      />

      <footer className="bg-gray-200">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <a
            href="brand"
            className="text-xl font-bold text-gray-500 hover:text-gray-400">
            Brand
          </a>
          <p className="py-2 text-gray-500 sm:py-0">All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};
