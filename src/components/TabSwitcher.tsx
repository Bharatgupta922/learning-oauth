'use-client'

import React from 'react'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'

type Props = {
    SignUpTab: React.ReactNode,
    SignIntab: React.ReactNode
}

const TabSwitcher = (props: Props) => {
  return (
    <Tabs className='max-w-[500px]'>
        <TabsList>
            <TabsTrigger value='sign-up'>Sign Up</TabsTrigger>
            <TabsTrigger value='sign-in'>Sign In</TabsTrigger>
        </TabsList>
        <TabsContent value='sign-in'>{props.SignIntab}</TabsContent>
        <TabsContent value='sign-up'>{props.SignUpTab}</TabsContent>
        
    </Tabs>
)
}

export default TabSwitcher