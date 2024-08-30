"use client";
import { useState, useEffect, useActionState } from 'react';
import { Button } from "@app/components/ui/button";
import { Input } from "@app/components/ui/input";
import * as Tabs from "@radix-ui/react-tabs";
import Web3 from 'web3';
import { ethers, Contract, ContractTransaction } from 'ethers';
import stakingJson from '../../../contract/staking.json';

import {
  BadgeCheckIcon,
  CircleDollarSignIcon,
  DollarSignIcon,
  RotateCwIcon,
} from "lucide-react";
import { Epoch } from '@app/types/pair';

export default function StakingPage() {
  const [showAll, setShowAll] = useState<boolean>(false);

  const [stakeAmount, setStakeAmount] = useState("0");
  const [unstakeAmount, setUnstakeAmount] = useState("0");

  // let stakeContract: Contract;

  const epoch = [
    { rewards: '800', epochend: '2023-01-01 12:00:00' },
    { rewards: '700', epochend: '2023-02-01 12:00:00' },
    { rewards: '600', epochend: '2023-03-01 12:00:00' },
    { rewards: '500', epochend: '2023-04-01 12:00:00' },
    { rewards: '400', epochend: '2023-05-01 12:00:00' },
    { rewards: '400', epochend: '2023-05-01 12:00:00' },
    { rewards: '400', epochend: '2023-05-01 12:00:00' },
    { rewards: '400', epochend: '2023-05-01 12:00:00' },
    { rewards: '400', epochend: '2023-05-01 12:00:00' },
    { rewards: '400', epochend: '2023-05-01 12:00:00' },
    { rewards: '400', epochend: '2023-05-01 12:00:00' },
    { rewards: '400', epochend: '2023-05-01 12:00:00' },
    { rewards: '400', epochend: '2023-05-01 12:00:00' },
    { rewards: '400', epochend: '2023-05-01 12:00:00' },
    { rewards: '400', epochend: '2023-05-01 12:00:00' },
    { rewards: '400', epochend: '2023-05-01 12:00:00' },
    { rewards: '400', epochend: '2023-05-01 12:00:00' },
    { rewards: '400', epochend: '2023-05-01 12:00:00' },
    { rewards: '400', epochend: '2023-05-01 12:00:00' },
    { rewards: '400', epochend: '2023-05-01 12:00:00' },
  ] as Epoch[];

  const toggleShowMore = () => {
    setShowAll(!showAll);
  };

  const handleStakeAmount = (e: any) => {
    setStakeAmount(e.target.value);
  }

  const handleUnstakeAmount = (e: any) => {
    setUnstakeAmount(e.target.value);
  }

  const stakingAbi: any[] = stakingJson.abi;
  let web3, provider;
  if(typeof window != 'undefined') {
    web3 = new Web3(window.ethereum);
    provider = new ethers.BrowserProvider(window.ethereum);
  }
  const signer = provider.getSigner();
  
  const handleStake = async () => {
    try {
      console.log('signer', (await signer).address);
      const stakeContract = new web3.eth.Contract(stakingAbi, "0x3aD4C840EEBF0E81A341aF6DE01112BD73EEC9F4");
      console.log(stakeContract)
      const tx = await stakeContract.methods.deposit(stakeAmount).send({from: (await signer).address})
      console.log('Deposit successful=====>', tx);
    } catch(error) {
      console.log(error);
    }
  }

  const handleUnstake = async () => {
    try {
      console.log('signer', (await signer).address);
      const stakeContract = new web3.eth.Contract(stakingAbi, "0x3aD4C840EEBF0E81A341aF6DE01112BD73EEC9F4");
      const tx = await stakeContract.methods.unStake().send({from: (await signer).address})
      console.log('Deposit successful=====>', tx);
    } catch(error) {
      console.log(error);
    }
  }

  const [activeTab, setActiveTab] = useState('stake');

  return (
    <div className="flex flex-col gap-4 p-4 pt-[72px]">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <BadgeCheckIcon size={24} className="text-primary" />
          <div className="text-lg md:text-2xl font-bold">
            Stake & Rewards dApp
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <div className="space-y-4 w-[80%]">
          <div className="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-3 gap-4 h-fit flex-1 p-4 rounded-lg border justify-between">
            <div className="flex flex-col gap-1 h-fit items-start">
              <div className="flex items-center gap-1">
                <DollarSignIcon size={16} className="text-primary" />
                <div className="text-sm text-muted-foreground">
                  Total Value Staked
                </div>
              </div>
              <div className={"text-base flex items-center gap-2 font-medium"}>
                $ 5000
              </div>
            </div>
            <div className="flex flex-col gap-1 h-fit items-start">
              <div className="flex items-center gap-1">
                <RotateCwIcon size={16} className="text-primary" />
                <div className="text-sm text-muted-foreground">
                  Total Rewards
                </div>
              </div>
              <div className="text-base font-medium">$ 1000</div>
            </div>
            <div className="flex flex-col gap-1 h-fit items-start">
              <div className="flex items-center gap-1">
                <CircleDollarSignIcon size={16} className="text-primary" />
                <div className="text-sm text-muted-foreground">
                  Epoch End Time
                </div>
              </div>
              <div className="text-base font-medium">
                2 days, 4 hours, 30 minutes
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-base flex items-center gap-2 font-medium">
              Epoch Overview
            </p>
            <div className="px-5">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[450px] overflow-y-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Epoch Number
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Unclamed Rewards
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Epoch End
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Settings
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {epoch.map((item: Epoch, index: number) => {
                    const isEven = (index + 1) % 2 === 0;
                    return (
                      showAll || index < 3 ? (
                      <tr
                        className={`border-b ${
                          isEven
                            ? "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700"
                            : ""
                        }`}
                        key={index}
                      >
                        <th
                          scope="row"
                          className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {index + 1}
                        </th>
                        <td className="px-6 py-3">${" "}{item.rewards}</td>
                        <td className="px-6 py-3">{item.epochend}</td>
                        <td className="px-6 py-2">
                          <Button>
                            Claim
                          </Button>
                        </td>
                      </tr>
                    ) : null
                    );
                  })}
                  </tbody>
                </table>
              </div>
              <div className='flex flex-row w-full justify-end py-5'>
                <Button
                  onClick={toggleShowMore}>
                  {showAll ? 'Show less' : 'More'}
                </Button>
              </div>
            </div>
          </div>
          <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="flex flex-col w-full" defaultValue="stake">
            <Tabs.List className="flex flex-row space-x-4">
              <Tabs.Trigger
                value="stake"
                className={`px-4 py-2 text-gray-400 flex items-center ${
                  activeTab === 'stake'
                    ? 'text-gray-400 flex-shrink-0 space-x-2 border border-b-0 rounded-t-lg dark:border-gray-600 '
                    : ' border-transparent'
                }`}
              >
                Stake
              </Tabs.Trigger>
              <Tabs.Trigger
                value="unstake"
                className={`px-4 py-2 text-gray-400 flex items-center ${
                  activeTab === 'unstake'
                    ? 'text-gray-400 flex-shrink-0 space-x-2 border border-b-0 rounded-t-lg dark:border-gray-800 '
                    : ' border-transparent'
                }`}
              >
                Unstake
              </Tabs.Trigger>
            </Tabs.List>
              <Tabs.Content
                className="grow p-5 rounded-b-md outline-none h-fit flex-1 p-4 rounded-lg border"
                value="stake"
              >
                <div className="flex flex-col justify-between lg:flex-row">
                  <div className='flex flex-col w-full gap-5 lg:w-[45%]'>
                    <p className="text-sm text-muted-foreground">
                      Enter the amount of ERC20 Token A to
                    </p>
                    <Input className="flex" placeholder="amount" value={stakeAmount} onChange={(e) => handleStakeAmount(e)} />
                    <div className="w-15" onClick={handleStake}>
                      <Button>Stake</Button>
                    </div>
                  </div>
                  <div className="relative overflow-x-auto shadow-md pt-5 sm:rounded-lg flex w-full lg:w-[45%] lg:pt-0">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Amount Staked
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Rewards Accrued
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Date/Time
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            $ 800
                          </th>
                          <td className="px-6 py-4">$ 200</td>
                          <td className="px-6 py-4">2023-01-01 12:00:00</td>
                        </tr>
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            $ 800
                          </th>
                          <td className="px-6 py-4">$ 200</td>
                          <td className="px-6 py-4">2023-01-01 12:00:00</td>
                        </tr>
                        <tr className="border-b">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            $ 800
                          </th>
                          <td className="px-6 py-4">$ 200</td>
                          <td className="px-6 py-4">2023-01-01 12:00:00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Tabs.Content>
              <Tabs.Content
                className="grow p-5 rounded-b-md outline-none h-fit flex-1 p-4 rounded-lg border"
                value="unstake"
              >
                <div className="flex flex-col justify-between lg:flex-row">
                  <div className='flex flex-col w-full gap-5 lg:w-[45%]'>
                  <p className="text-sm text-muted-foreground">
                    Enter the amount of ERC20 Token A to
                  </p>
                  <Input className="flex" placeholder="amount" value={unstakeAmount} onChange={handleUnstakeAmount} />
                  <div className="w-15" onClick={handleUnstake}>
                    <Button>Unstake</Button>
                  </div>
                  </div>
                  <div className="relative overflow-x-auto shadow-md pt-5 sm:rounded-lg flex w-full lg:w-[45%] lg:pt-0">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Amount Staked
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Rewards Accrued
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Date/Time
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            $ 800
                          </th>
                          <td className="px-6 py-4">$ 200</td>
                          <td className="px-6 py-4">2023-01-01 12:00:00</td>
                        </tr>
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            $ 800
                          </th>
                          <td className="px-6 py-4">$ 200</td>
                          <td className="px-6 py-4">2023-01-01 12:00:00</td>
                        </tr>
                        <tr className="border-b">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            $ 800
                          </th>
                          <td className="px-6 py-4">$ 200</td>
                          <td className="px-6 py-4">2023-01-01 12:00:00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
}