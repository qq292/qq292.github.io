

[lag]{简体中文}
[简体中文]{blog/GASDocumentation-zh.md}
[English]{blog/GASDocumentation-en.md}

# GASDocumentation
这里写的是我对虚幻引擎 5 的 GameplayAbilitySystem 插件 (GAS) 的理解，以及一个简单的多人示例项目。这不是官方文档，本项目和我本人都与 Epic Games 无关。我不保证这些信息的准确性。
本文档的目的是解释 GAS 中的主要概念和类，并根据我的使用经验提供一些补充说明。社区中的用户对 GAS 有很多 "部落知识"，我希望在此分享我的所有知识。
示例项目和文档目前使用的是**虚幻引擎 5.2**。本文档有针对虚幻引擎旧版本的分支，但它们不再受支持，并且可能存在错误或信息过时。

[GASShooter](https://github.com/tranek/GASShooter) 是一个姊妹示例项目，展示了在多人 FPS/TPS 游戏中使用 GAS 的高级技术。

最好的文档永远是插件源码。

<a name="table-of-contents"></a>
## 目录

> 1. [对 GameplayAbilitySystem 插件的介绍](#intro)
> 1. [示例项目](#sp)
> 1. [建立一个使用 GAS 的项目](#setup)
> 1. [概念](#concepts)  
>    4.1 [技能系统组件/Ability System Component/ASC](#concepts-asc)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.1.1 [复制模式](#concepts-asc-rm)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.1.2 [建立和初始化](#concepts-asc-setup)  
>    4.2 [游戏标签/Gameplay Tags](#concepts-gt)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.2.1 [修改游戏标签时的响应](#concepts-gt-change)  
>    4.3 [属性/Attributes](#concepts-a)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.3.1 [属性定义](#concepts-a-definition)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.3.2 [基础值和当前值](#concepts-a-value)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.3.3 [元属性](#concepts-a-meta)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.3.4 [属性变化时的响应](#concepts-a-changes)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.3.5 [派生属性](#concepts-a-derived)  
>    4.4 [Attribute Set](#concepts-as)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.4.1 [属性集的定义](#concepts-as-definition)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.4.2 [属性集的设计](#concepts-as-design)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.4.2.1 [具有独立属性的子组件](#concepts-as-design-subcomponents)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.4.2.2 [在运行时增加或者删除属性集](#concepts-as-design-addremoveruntime)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.4.2.3 [道具属性 (武器弹药)](#concepts-as-design-itemattributes)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.4.2.3.1 [在道具上使用普通浮点数](#concepts-as-design-itemattributes-plainfloats)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.4.2.3.2 [道具上的`属性集`](#concepts-as-design-itemattributes-attributeset)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.4.2.3.3 [道具上的`ASC`](#concepts-as-design-itemattributes-asc)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.4.3 [定义属性](#concepts-as-attributes)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.4.4 [属性初始化](#concepts-as-init)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.4.5 [PreAttributeChange()](#concepts-as-preattributechange)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.4.6 [PostGameplayEffectExecute()](#concepts-as-postgameplayeffectexecute)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.4.7 [OnAttributeAggregatorCreated()](#concepts-as-onattributeaggregatorcreated)  
>    4.5 [游戏效果/Gameplay Effect/GE](#concepts-ge)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.1 [游戏效果的定义](#concepts-ge-definition)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.2 [应用游戏效果](#concepts-ge-applying)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.3 [移除游戏效果](#concepts-ga-removing)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.4 [游戏效果修改器](#concepts-ge-mods)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.4.1 [乘法和除法修改器](#concepts-ge-mods-multiplydivide)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.4.2 [修改器上的游戏标签](#concepts-ge-mods-gameplaytags)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.5 [堆叠游戏效果](#concepts-ge-stacking)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.6 [授予技能](#concepts-ge-ga)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.7 [游戏效果标签](#concepts-ge-tags)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.8 [免疫](#concepts-ge-immunity)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.9 [游戏效果实例](#concepts-ge-spec)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.9.1 [SetByCaller](#concepts-ge-spec-setbycaller)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.10 [Gameplay Effect Context](#concepts-ge-context)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.11 [Modifier Magnitude Calculation](#concepts-ge-mmc)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.12 [Gameplay Effect Execution Calculation](#concepts-ge-ec)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.12.1 [Sending Data to Execution Calculations](#concepts-ge-ec-senddata)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.12.1.1 [SetByCaller](#concepts-ge-ec-senddata-setbycaller)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.12.1.2 [Backing Data Attribute Calculation Modifier](#concepts-ge-ec-senddata-backingdataattribute)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.12.1.3 [Backing Data Temporary Variable Calculation Modifier](#concepts-ge-ec-senddata-backingdatatempvariable)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.12.1.4 [Gameplay Effect Context](#concepts-ge-ec-senddata-effectcontext)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.13 [Custom Application Requirement](#concepts-ge-car)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.14 [Cost Gameplay Effect](#concepts-ge-cost)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.15 [Cooldown Gameplay Effect](#concepts-ge-cooldown)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.15.1 [Get the Cooldown Gameplay Effect's Remaining Time](#concepts-ge-cooldown-tr)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.15.2 [Listening for Cooldown Begin and End](#concepts-ge-cooldown-listen)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.15.3 [Predicting Cooldowns](#concepts-ge-cooldown-prediction)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.16 [Changing Active Gameplay Effect Duration](#concepts-ge-duration)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.17 [Creating Dynamic Gameplay Effects at Runtime](#concepts-ge-dynamic)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5.18 [Gameplay Effect Containers](#concepts-ge-containers)  
>    4.6 [Gameplay Abilities](#concepts-ga)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.6.1 [Gameplay Ability Definition](#concepts-ga-definition)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.6.1.1 [Replication Policy](#concepts-ga-definition-reppolicy)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.6.1.2 [Server Respects Remote Ability Cancellation](#concepts-ga-definition-remotecancel)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.6.1.3 [Replicate Input Directly](#concepts-ga-definition-repinputdirectly)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.6.2 [Binding Input to the ASC](#concepts-ga-input)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.6.2.1 [Binding to Input without Activating Abilities](#concepts-ga-input-noactivate)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.6.3 [Granting Abilities](#concepts-ga-granting)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.6.4 [Activating Abilities](#concepts-ga-activating)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.6.4.1 [Passive Abilities](#concepts-ga-activating-passive)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.6.4.2 [Activation Failed Tags](#concepts-ga-activating-failedtags)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.6.5 [Canceling Abilities](#concepts-ga-cancelabilities)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.6.6 [Getting Active Abilities](#concepts-ga-definition-activeability)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.6.7 [Instancing Policy](#concepts-ga-instancing)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.6.8 [Net Execution Policy](#concepts-ga-net)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.6.9 [Ability Tags](#concepts-ga-tags)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.6.10 [Gameplay Ability Spec](#concepts-ga-spec)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.6.11 [Passing Data to Abilities](#concepts-ga-data)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.6.12 [Ability Cost and Cooldown](#concepts-ga-commit)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.6.13 [Leveling Up Abilities](#concepts-ga-leveling)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.6.14 [Ability Sets](#concepts-ga-sets)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.6.15 [Ability Batching](#concepts-ga-batching)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.6.16 [Net Security Policy](#concepts-ga-netsecuritypolicy)  
>    4.7 [Ability Tasks](#concepts-at)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.7.1 [Ability Task Definition](#concepts-at-definition)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.7.2 [Custom Ability Tasks](#concepts-at-definition)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.7.3 [Using Ability Tasks](#concepts-at-using)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.7.4 [Root Motion Source Ability Tasks](#concepts-at-rms)  
>    4.8 [Gameplay Cues](#concepts-gc)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.8.1 [Gameplay Cue Definition](#concepts-gc-definition)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.8.2 [Triggering Gameplay Cues](#concepts-gc-trigger)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.8.3 [Local Gameplay Cues](#concepts-gc-local)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.8.4 [Gameplay Cue Parameters](#concepts-gc-parameters)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.8.5 [Gameplay Cue Manager](#concepts-gc-manager)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.8.6 [Prevent Gameplay Cues from Firing](#concepts-gc-prevention)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.8.7 [Gameplay Cue Batching](#concepts-gc-batching)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.8.7.1 [Manual RPC](#concepts-gc-batching-manualrpc)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.8.7.2 [Multiple GCs on one GE](#concepts-gc-batching-gcsonge)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.8.8 [Gameplay Cue Events](#concepts-gc-events)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.8.9 [Gameplay Cue Reliability](#concepts-gc-reliability)  
>    4.9 [Ability System Globals](#concepts-asg)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.9.1 [InitGlobalData()](#concepts-asg-initglobaldata)  
>    4.10 [Prediction](#concepts-p)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.10.1 [Prediction Key](#concepts-p-key)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.10.2 [Creating New Prediction Windows in Abilities](#concepts-p-windows)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.10.3 [Predictively Spawning Actors](#concepts-p-spawn)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.10.4 [Future of Prediction in GAS](#concepts-p-future)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.10.5 [Network Prediction Plugin](#concepts-p-npp)  
>    4.11 [Targeting](#concepts-targeting)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.11.1 [Target Data](#concepts-targeting-data)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.11.2 [Target Actors](#concepts-targeting-actors)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.11.3 [Target Data Filters](#concepts-target-data-filters)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.11.4 [Gameplay Ability World Reticles](#concepts-targeting-reticles)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.11.5 [Gameplay Effect Containers Targeting](#concepts-targeting-containers)  
> 1. [Commonly Implemented Abilities and Effects](#cae)  
>    5.1 [Stun](#cae-stun)  
>    5.2 [Sprint](#cae-sprint)  
>    5.3 [Aim Down Sights](#cae-ads)  
>    5.4 [Lifesteal](#cae-ls)  
>    5.5 [Generating a Random Number on Client and Server](#cae-random)  
>    5.6 [Critical Hits](#cae-crit)  
>    5.7 [Non-Stacking Gameplay Effects but Only the Greatest Magnitude Actually Affects the Target](#cae-nonstackingge)  
>    5.8 [Generate Target Data While Game is Paused](#cae-paused)  
>    5.9 [One Button Interaction System](#cae-onebuttoninteractionsystem)  
> 1. [Debugging GAS](#debugging)  
>    6.1 [showdebug abilitysystem](#debugging-sd)  
>    6.2 [Gameplay Debugger](#debugging-gd)  
>    6.3 [GAS Logging](#debugging-log)  
> 1. [Optimizations](#optimizations)  
>    7.1 [Ability Batching](#optimizations-abilitybatching)  
>    7.2 [Gameplay Cue Batching](#optimizations-gameplaycuebatching)  
>    7.3 [AbilitySystemComponent Replication Mode](#optimizations-ascreplicationmode)  
>    7.4 [Attribute Proxy Replication](#optimizations-attributeproxyreplication)  
>    7.5 [ASC Lazy Loading](#optimizations-asclazyloading)  
> 1. [Quality of Life Suggestions](#qol)  
>    8.1 [Gameplay Effect Containers](#qol-gameplayeffectcontainers)  
>    8.2 [Blueprint AsyncTasks to Bind to ASC Delegates](#qol-asynctasksascdelegates)  
> 1. [Troubleshooting](#troubleshooting)  
>    9.1 [`LogAbilitySystem: Warning: Can't activate LocalOnly or LocalPredicted ability %s when not local!`](#troubleshooting-notlocal)  
>    9.2 [`ScriptStructCache` errors](#troubleshooting-scriptstructcache)  
>    9.3 [Animation Montages are not replicating to clients](#troubleshooting-replicatinganimmontages)  
>    9.4 [Duplicating Blueprint Actors is setting AttributeSets to nullptr](#troubleshooting-duplicatingblueprintactors)  
>    9.5 [unresolved external symbol UEPushModelPrivate::MarkPropertyDirty(int,int)](#troubleshooting-unresolvedexternalsymbolmarkpropertydirty)  
>    9.6 [Enum names are now represented by path name](#troubleshooting-enumnamesarenowpathnames)  
> 1. [Common GAS Acronyms](#acronyms)
> 1. [Other Resources](#resources)  
>    11.1 [Q&A With Epic Game's Dave Ratti](#resources-daveratti)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;11.1.1 [Community Questions 1](#resources-daveratti-community1)  
>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;11.1.2 [Community Questions 2](#resources-daveratti-community2)  
> 1. [GAS Changelog](#changelog)  
>    * [5.2](#changelog-5.2)  
>    * [5.1](#changelog-5.1)  
>    * [5.0](#changelog-5.0)  
>    * [4.27](#changelog-4.27)  
>    * [4.26](#changelog-4.26)  
>    * [4.25.1](#changelog-4.25.1)  
>    * [4.25](#changelog-4.25)  
>    * [4.24](#changelog-4.24)
         
<a name="intro"></a>
## 1. GameplayAbilitySystem插件介绍
根据 [官方文档](https://docs.unrealengine.com/en-US/Gameplay/GameplayAbilitySystem/index.html):
>Gameplay技能系统 是一个高度灵活的框架，可用于构建你可能会在RPG或MOBA游戏中看到的技能和属性类型。你可以构建可供游戏中的角色使用的动作或被动技能，使这些动作导致各种属性累积或损耗的状态效果，实现约束这些动作使用的"冷却"计时器或资源消耗，更改技能等级及每个技能等级的技能效果，激活粒子或音效，等等。简单来说，此系统可帮助你在任何现代RPG或MOBA游戏中设计、实现及高效关联各种游戏中的技能，既包括跳跃等简单技能，也包括你喜欢的角色的复杂技能集。

GameplayAbilitySystem插件由Epic游戏公司开发，和虚幻引擎5（UE5）一同提供。它已经在3A商业游戏中投入使用，如《虚幻争霸》（Paragon）和《堡垒之夜》（Fortnite）等。

该插件为单人和多人游戏提供了开箱即用的解决方案：
* 实现基于等级的角色能力或技能，带有可选的消耗和冷却时间 ([GameplayAbilities](#concepts-ga))
* 操纵属于Actor的数值性 `属性` ([Attributes](#concepts-a))
* 将状态效果应用于Actor ([GameplayEffects](#concepts-ge))
* 将`游戏标签`应用于Actor ([GameplayTags](#concepts-gt))
* 生成视觉或声音效果 ([GameplayCues](#concepts-gc))
* 复制以上提到的所有内容

在多人游戏里，GAS也为以下内容提供 [客户端预测](#concepts-p)：
* 技能激活
* 播放动画蒙太奇
* 修改`属性`
* 应用`游戏标签`
* 生成`游戏信号`
* 通过绑定到 `CharacterMovementComponent` 的 `RootMotionSource` 函数移动。

**GAS 必须在 C++ 层设置**, 但是 `游戏技能` and `游戏效果` 可以由设计师在蓝图中创建.

目前 GAS 的缺陷:
* `游戏效果`延迟调节 (无法预测能力冷却时间，导致延迟较高的玩家对低冷却时间能力的射速低于延迟较低的玩家).
* 无法预测`游戏效果`的移除。但我们可以预测添加具有反效果的`游戏效果`，从而有效地移除它们。这并不总是合适或可行的，而且仍然是一个问题。
* 缺乏模板、多人游戏示例和文档。希望这篇文章能有一点贡献！

**[⬆ 回到顶部](#table-of-contents)**

<a name="sp"></a>
## 2. 示例项目
本文档中包含一个多人第三人称射击游戏示例项目，面向熟悉 UE 5 但不熟悉 GameplayAbilitySystem 插件的用户。我们假设用户已了解 C++、蓝图、UMG、复制等 UE5 中的其他中级主题。该项目提供了一个示例，说明如何设置基本的第三人称射击多人游戏项目就绪，其中玩家/AI 控制的`PlayerState`类上有`AbilitySystemComponent`( ASC) ， AI 控制的小兵的 `Character` 类上也有`ASC`。
我们的目标是保持项目简单，同时展示 GAS 基础知识并通过注释良好的代码展示一些常见的功能。由于其专注于初学者，该项目不展示[飞弹预测](#concepts-p-spawn)等高级主题。

涉及到的概念：
* 在 `PlayerState` 和 `Character` 上的 `ASC` 
* 复制 `属性`
* 复制动画蒙太奇
* `游戏标签`
* 在`游戏技能`以内和以外，应用和移除`游戏效果` 
* 计算角色护甲减轻后的伤害
* `GameplayEffectExecutionCalculations`
* 击晕效果
* 死亡和重生
* 从服务器上的技能生成 Actor（飞弹）
* 在瞄准和冲刺状态预测改变本地玩家的速度
* 冲刺时持续消耗体力
* 使用法力来施放技能
* 被动技能
* 堆叠 `游戏效果`
* 瞄准 Actor
* 在蓝图中创建`游戏技能`
* 在 C++ 中创建`游戏技能`
* 每个 `Actor` 单独实例化的`游戏技能`
* 非实例化的`游戏技能`（跳跃）
* 静态`游戏信号` (火枪子弹撞击粒子效果)
* Actor形式的`游戏信号` (冲刺和眩晕粒子效果)

英雄有以下技能：

| 技能                    | 输入          | 是否预测  | C++ / 蓝图 | 描述                                                                                                                                                                  |
| -------------------------- | ------------------- | ---------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 跳跃                       | 空格键           | 是        | C++             | 使英雄跳跃                                                                                                                                                         |
| 开枪                        | 鼠标左键   | 否         | C++             | 从英雄的枪中发射飞弹。动画可预测，但飞弹无法预测。                                                                                |
| 瞄准            | 鼠标右键  | 是        | 蓝图       | 按住按钮时，英雄会走得更慢，镜头会放大，以便用枪进行更精确的射击。                                                    |
| 疾跑                     | 左 Shift          | 是        | 蓝图       | 按住按钮时，英雄会跑得更快，同时消耗体力。                                                                                                         |
| 向前冲刺               | Q                   | 是        | 蓝图       | 英雄消耗体力向前冲刺。                                                                                                                              |
| 叠加护甲       | 被动             | 否         | 蓝图       | 每 4 秒英雄就会获得一层护甲，最多可达 4 层。受到伤害会移除一层护甲。                                                    |
| 流星                     | R                   | 否         | 蓝图       | 玩家瞄准一个位置，向敌人投下一颗流星，造成伤害并击晕他们。目标是可以预测的，而流星无法预测。                     |

`游戏技能` 使用 C++ 还是蓝图创建并不重要。这里两者都有使用，以作为两者的范例。

野怪没有任何预定义的`游戏技能`。红色野怪有更强的生命恢复，而蓝色野怪有更高的起始生命值。

对于`游戏技能`的命名，后缀`_BP`表示逻辑是在蓝图中创建的。没有后缀意味着逻辑是用 C++ 创建的。

**蓝图资源命名前缀**

| 前缀      | 资源类型         |
| ----------- | ------------------- |
| GA_         | 游戏技能/GameplayAbility     |
| GC_         | 游戏信号/GameplayCue         |
| GE_         | 游戏效果/GameplayEffect      |

**[⬆ 回到顶部](#table-of-contents)**

<a name="setup"></a>
## 3. 建立一个带有GAS的工程
建立一个带有GAS的工程的基本步骤:
1. 在编辑器启用 GameplayAbilitySystem 插件
1. 编辑`YourProjectName.Build.cs`，把`"GameplayAbilities", "GameplayTags", "GameplayTasks"`添加到`PrivateDependencyModuleNames`
1. 刷新/重新生成 Visual Studio 项目文件
4. 从 4.24 开始，强制调用`UAbilitySystemGlobals::Get().InitGlobalData()`以使用[`TargetData`](#concepts-targeting-data). 示例项目这段代码位于`UAssetManager::StartInitialLoading()``。请参阅[`InitGlobalData()`](#concepts-asg-initglobaldata)获取更多信息。

这就是启用 GAS 所需要做的全部工作。从这里开始，为你的 `Character` 或 `PlayerState` 添加 [`ASC`](#concepts-asc) 和 [`属性集`](#concepts-as) ，开始制作 [`游戏技能`](#concepts-ga)和[`游戏效果`](#concepts-ge)吧！

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts"></a>
## 4. GAS 相关概念

#### Sections

> 4.1 [技能系统组件/Ability System Component/ASC](#concepts-asc)  
> 4.2 [游戏标签/Gameplay Tags](#concepts-gt)  
> 4.3 [属性/Attributes](#concepts-a)  
> 4.4 [属性集/Attribute Set](#concepts-as)  
> 4.5 [游戏效果/Gameplay Effects/GE](#concepts-ge)  
> 4.6 [游戏技能/Gameplay Abilities](#concepts-ga)  
> 4.7 [技能任务/Ability Tasks](#concepts-at)  
> 4.8 [游戏信号/Gameplay Cues](#concepts-gc)  
> 4.9 [技能系统全局信息](#concepts-asg)  
> 4.10 [预测](#concepts-p)

<a name="concepts-asc"></a>
### 4.1 技能系统组件/Ability System Component/ASC
`AbilitySystemComponent` (`ASC`) 是 GAS 的核心. 它是一种 `UActorComponent` ([`UAbilitySystemComponent`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/UAbilitySystemComponent/index.html)) ，负责所有与系统的交互工作。任何 `Actor` 如果想要使用 [`游戏技能`](#concepts-ga) 、拥有[`属性`](#concepts-a)、或者接收 [`游戏效果`](#concepts-ge) ，都必须有一个`ASC`。这些对象都存在于 ASC 内部并由 ASC 管理和复制（除了属性的复制由其所属[`属性集`](#concepts-as)负责）。开发人员应该但不要求对`ASC`进行子类化。

`ASC` 附加到的 `Actor` 称为 `ASC` 的 `OwnerActor`。物理显示 `ASC` 的 `Actor` 称为 `AvatarActor`。`AvatarActor` 和 `OwnerActor` 可以是同一个，例如 MOBA 游戏中简单的 AI 野怪。它们也可以不同，就像 MOBA 游戏中玩家控制的英雄一样，其中`OwnerActor`是`PlayerState`，`AvatarActor`是英雄的`Character`。大多数`Actor`都会拥有`ASC`。如果您的`Actor`会重生并且需要`属性`或`游戏效果`在重生之间持续存在（就像 MOBA 中的英雄），那么`ASC`理想的位置是在`PlayerState`上。

注意：如果你的 `ASC` 位于 `PlayerState`，那么您将需要提高 `PlayerState` 的 `NetUpdateFrequency`。它默认为非常低的值，并且可能会在客户端`属性`和`游戏标签`之类的值发生改变的时候产生延迟或感知滞后。一定要启用 [`Adaptive Network Update Frequency`](https://docs.unrealengine.com/en-US/Gameplay/Networking/Actors/Properties/index.html#adaptivenetworkupdatefrequency)，《堡垒之夜》就是这样做的。

如果 `OwnerActor` 和 `AvatarActor` 不是同一个 `Actor`，需要实现`IAbilitySystemInterface`。这个接口有一个要复写的函数`UAbilitySystemComponent* GetAbilitySystemComponent() const`，他返回指向 `ASC`的指针。`ASC` 会查找这个接口函数，以在系统内部彼此交互。

`ASC` 把已激活的 `游戏效果` 存放在 `FActiveGameplayEffectsContainer ActiveGameplayEffects`。

`ASC` 把经过授权的 `游戏技能` 存放在 `FGameplayAbilitySpecContainer ActivatableAbilities`。每次遍历 `ActivatableAbilities.Items` 的时候，确保要在循环外加上 `ABILITYLIST_SCOPE_LOCK();` ，以锁定这个列表，防止在遍历的过程中有技能删除。每一次进入`ABILITYLIST_SCOPE_LOCK();`的范围都会递增`AbilityScopeLockCount`计数器，在离开范围的时候递减。不要试图在 `ABILITYLIST_SCOPE_LOCK();` 范围内删除一个技能，删除技能的函数会在内部检查 `AbilityScopeLockCount` 以免在锁定列表的情况下删除技能。

<a name="concepts-asc-rm"></a>
### 4.1.1 复制模式
`ASC`定义了三种模式来复制`游戏技能`，`游戏标签`，和 `游戏信号`：`Full`, `Mixed`, and `Minimal`。`属性`的复制由它们所属的`属性集`负责。

| 复制模式   | 何时使用                             | 描述                                                                                                                    |
| ------------------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `Full`             | 单人游戏                           | 每一个 `游戏效果` 会被复制到每一个客户端                                                                         |
| `Mixed`            | 多人游戏，玩家控制的 `Actor` | `游戏效果`只会被复制到主控端。 `游戏标签` 和 `游戏信号` 会复制到所有人。|
| `Minimal`          | 多人游戏，AI 控制的 `Actor`     | `游戏效果` 不会复制。`游戏标签` 和 `游戏信号`会复制到所有人。           |

**Note:** `Mixed` 模式要求 `OwnerActor` 的 `Owner` 是 `Controller`。`PlayerState` 的 `Owner` 默认情况下是 `Controller`，但是 `Character` 的不是。如果`OwnerActor` 不是 `PlayerState` 的情况下使用 `Mixed` 复制模式，你需要调用 `SetOwner()` 在 `OwnerActor` ，给予其一个有效的 `Controller`。

4.24 版本之后, `Pawn`的`PossessedBy()` 函数可以更换 `Controller`。

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-asc-setup"></a>
### 4.1.2 设置和初始化
`ASC` 通常在 `OwnerActor` 的构造函数里初始化并且被标记为已复制。**这个必须在 C++ 完成**。

```c++
AGDPlayerState::AGDPlayerState()
{
	// 创建ASC，并且标记为已复制
	AbilitySystemComponent = CreateDefaultSubobject<UGDAbilitySystemComponent>(TEXT("AbilitySystemComponent"));
	AbilitySystemComponent->SetIsReplicated(true);
	//...
}
```

`ASC` 需要在服务器和客户端上用其 `OwnerActor` 和 `AvatarActor` 初始化。初始化需要在 `Pawn` 的`Controller` 设置完成后（也就是控制动作完成后）。单人游戏只需要采用服务器方式。

对于 `ASC` 位于其 `Pawn` 上的玩家角色，在服务器上通常通过 `Pawn` 的 `PossessedBy()` 函数初始化，客户端上通常通过 `PlayerController` 的 `AcknowledgePossession()` 函数初始化。

```c++
void APACharacterBase::PossessedBy(AController * NewController)
{
	Super::PossessedBy(NewController);

	if (AbilitySystemComponent)
	{
		AbilitySystemComponent->InitAbilityActorInfo(this, this);
	}

	// ASC Mixed 复制模式要求 ASC Owner 的 Owner 是 Controller
	SetOwner(NewController);
}
```

```c++
void APAPlayerControllerBase::AcknowledgePossession(APawn* P)
{
	Super::AcknowledgePossession(P);

	APACharacterBase* CharacterBase = Cast<APACharacterBase>(P);
	if (CharacterBase)
	{
		CharacterBase->GetAbilitySystemComponent()->InitAbilityActorInfo(CharacterBase, CharacterBase);
	}

	//...
}
```

对于 `ASC` 位于其 `PlayerState` 上的玩家控制角色，通常在 `Pawn` 的 `PossessedBy()` 函数中初始化服务器，并在 `Pawn` 的 `OnRep_PlayerState()` 函数中初始化客户端。这样可以确保 `PlayerState` 存在于客户端。

```c++
// 服务器代码
void AGDHeroCharacter::PossessedBy(AController * NewController)
{
	Super::PossessedBy(NewController);

	AGDPlayerState* PS = GetPlayerState<AGDPlayerState>();
	if (PS)
	{
		// 设置服务器的 ASC。客户端在 OnRep_PlayerState() 函数调用
		AbilitySystemComponent = Cast<UGDAbilitySystemComponent>(PS->GetAbilitySystemComponent());

		// AI 不会有 PlayerController，因此我们可以在这里再启动一次以确保万无一失。对于拥有 PlayerController 的英雄，启动两次也无妨。
		PS->GetAbilitySystemComponent()->InitAbilityActorInfo(PS, this);
	}
	
	//...
}
```

```c++
// 客户端代码
void AGDHeroCharacter::OnRep_PlayerState()
{
	Super::OnRep_PlayerState();

	AGDPlayerState* PS = GetPlayerState<AGDPlayerState>();
	if (PS)
	{
		// 设置客户端的 ASC。服务器在 PossessedBy 调用。
		AbilitySystemComponent = Cast<UGDAbilitySystemComponent>(PS->GetAbilitySystemComponent());

		// 初始化客户端的ASC。服务器会在控制一个新的 Actor 的时候初始化它的ASC。
		AbilitySystemComponent->InitAbilityActorInfo(PS, this);
	}

	// ...
}
```

如果发生报错 `LogAbilitySystem: Warning: Can't activate LocalOnly or LocalPredicted ability %s when not local!` 说明你没有在客户端初始化 `ASC`。

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-gt"></a>
### 4.2 游戏标签 / Gameplay Tags
[`FGameplayTags`](https://docs.unrealengine.com/en-US/API/Runtime/GameplayTags/FGameplayTag/index.html) 是一种层级化的命名， 类似 `Parent.Child.Grandchild...` 注册在 `GameplayTagManager`。这些标签对于分类和描述对象的状态非常有用。例如，如果一个角色被击晕，我们可以在击晕期间给他一个 `State.Debuff.Stun` 标签。

之前用布尔或枚举处理的东西，现在可以用标签代替。布尔逻辑现在基于“物体是否有某个标签”。

如果一个物体需要被加标签，我们通常会加到他的 `ASC` 上——如果他有 `ASC` 的话。这样 `GAS` 就可以和它交互。
`UAbilitySystemComponent` 实现了 `IGameplayTagAssetInterface` 接口，提供了访问标签的能力。

标签一般存储在 `FGameplayTagContainer`，他比 `TArray<FGameplayTag>` 更佳，因为其在效率方面施加了一点魔法。标签是标准的 `FName`，如果在项目设置中启用了`快速复制`（Fast Replication）功能，它们就可以被快速地打包到 `FGameplayTagContainer` 中以复制。快速复制要求服务器和客户端拥有相同的游戏标签列表。这通常不是个问题，因为一般都应该启用这个选项。`GameplayTagContainer` 还可以返回一个 `TArray<FGameplayTag>` 用于迭代。

存放在 `FGameplayTagCountContainer` 里的`游戏标签`时拥有一个 `TagMap`，其中存储了该`游戏标签`的实例数量。 `FGameplayTagCountContainer` 中可能仍有`游戏标签`，但其 `TagMapCount` 为零。在调试时如果 `ASC` 中仍有`游戏标签`，可能会遇到这种情况。任何 `HasTag()` 或 `HasMatchingTag()` 或类似函数都会检查 `TagMapCount`，如果`游戏标签`不存在或其 `TagMapCount` 为零，则返回 false。

`游戏标签`必须在 `DefaultGameplayTags.ini` 中提前定义。UE5 编辑器在项目设置中提供了一个界面，让开发者无需手动编辑 `DefaultGameplayTags.ini` 即可管理`游戏标签`。标签编辑器可以创建、重命名、搜索引用和删除标签。

![项目设置里的标签编辑器](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/gameplaytageditor.png)

搜索`游戏标签`的引用会在编辑器中弹出我们熟悉的引用查看器，显示所有引用`游戏标签`的资产。但这不会显示任何引用`游戏标签`的 C++ 类。

重命名`游戏标签`会创建一个重定向器，这样仍然引用原始`游戏标签`的资产就可以重定向到新的 `游戏标签`。如果可能的话，我更倾向于创建一个新的`游戏标签`，手动更新所有对新`游戏标签`的引用，然后删除旧的`游戏标签`，以避免产生重定向器。

除了`快速复制`之外，`游戏标签`编辑器还有一个选项，可以填写经常需要复制的`游戏标签`，以进一步优化它们。

如果`游戏标签`是通过`游戏效果`添加的，那么它们就会被复制。`ASC` 允许你添加 `LooseGameplayTag`，这种标签不会被复制，必须手动管理。示例项目中为 `State.Dead` 使用了一个 `LooseGameplayTag`，这样当主控客户端的生命值降至零时，就可以立即做出响应。重生会手动将 `TagMapCount` 调回零。只有在使用 `LooseGameplayTag` 时才能手动调整 `TagMapCount`。与其手动调整 `TagMapCount` ，更好的方法是使用 `UAbilitySystemComponent::AddLooseGameplayTag()` 和 `UAbilitySystemComponent::RemoveLooseGameplayTag()` 函数。

在C++里获取一个对`游戏标签`的引用：

```c++
FGameplayTag::RequestGameplayTag(FName("Your.GameplayTag.Name"))
```

如需对`游戏标签`进行高级操作，如获取父级或子级`游戏标签`，请查看 GameplayTagManager 提供的函数。要访问 `GameplayTagManager`，请包含 `GameplayTagManager.h`，并使用 `UGameplayTagManager::Get().FunctionName` 调用它。`GameplayTagManager` 实际上是将`游戏标签`存储为关系节点（父节点、子节点等），这样处理起来比持续的字符串操作和比较更快。

`GameplayTag`和 `GameplayTagContainer` 可以加可选的 `UPROPERTY` 限定符 `Meta = (Categories = "GameplayCue")`，它可以在蓝图中过滤标签，只显示父标签为 `GameplayCue` 的标签。当你需要在蓝图中知道某个 `GameplayTag` 或 `GameplayTagContainer` 变量只能用于 `GameplayCue` 时，这就非常有用了。

另外，还有一种名为 `FGameplayCueTag` 的独立结构，它封装了一个 `FGameplayTag`，还能在蓝图中自动过滤标签，只显示父标签为 `GameplayCue` 的标签。


如果要在函数中过滤`游戏标签`参数，请使用 `UFUNCTION` 限定符 `Meta = (GameplayTagFilter = "GameplayCue")`。这个方法不能过滤函数中的 `GameplayTagContainer` 参数。如果您想编辑您的引擎以允许这样做，请查看 `Engine\Plugins\Editor\GameplayTagsEditor\Source\GameplayTagsEditor\Private\SGameplayTagGraphPin.cpp` 中的 `SGameplayTagGraphPin::ParseDefaultValueData()` 是如何调用 `FilterString = UGameplayTagsManager::Get().GetCategoriesMetaFromField(PinStructType);`，如何在`SGameplayTagGraphPin::GetListContent()`函数里传递`FilterString`参数给`SGameplayTagWidget`。这些函数的 `GameplayTagContainer` 版本位于`Engine\Plugins\Editor\GameplayTagsEditor\Source\GameplayTagsEditor\Private\SGameplayTagContainerGraphPin.cpp` 中，不会检查元字段属性并传递过滤器。

示例项目广泛使用了`游戏标签`。

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-gt-change"></a>
### 4.2.1 响应游戏标签的更改
当添加或删除`游戏标签`时，`ASC` 提供了一个委托。它接收一个 `EGameplayTagEventType`，该 `EGameplayTagEventType` 可以指定只在添加/删除`游戏标签`，或`游戏标签`的 TagMapCount 发生变化时触发。

```c++
AbilitySystemComponent->RegisterGameplayTagEvent(FGameplayTag::RequestGameplayTag(FName("State.Debuff.Stun")), EGameplayTagEventType::NewOrRemoved).AddUObject(this, &AGDPlayerState::StunTagChanged);
```

回调函数有两个参数，`GameplayTag` 和新的 `TagCount`：
```c++
virtual void StunTagChanged(const FGameplayTag CallbackTag, int32 NewCount);
```

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-a"></a>
### 4.3 属性

<a name="concepts-a-definition"></a>
#### 4.3.1 属性定义
`属性（Attribute）`是由 `FGameplayAttributeData` 结构定义的浮点数值。它们可以代表任何东西，从角色的血量值到角色的等级，再到药水的药量。如果是属于某个角色的与游戏相关的数值，则应考虑使用`属性`来表示。`属性`一般只能由[`游戏效果`](#concepts-ge)修改，以便 `ASC` [预测](#concepts-p)其变化。

`属性`由[`属性集（AttributeSet）`](#concepts-as)负责定义，并存在于`属性集`中。`属性集`负责复制带有复制标记的属性。有关如何定义`属性`，请参阅[属性集](#concepts-as)部分。

**提示：** 如果不想让`属性`显示在编辑器的属性列表中，可以使用 `Meta = (HideInDetailsView)` 限定符。

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-a-value"></a>
#### 4.3.2 基础值与当前值
`属性`由两部分组成：`基础值（BaseValue）`和 `当前值（CurrentValue）`。`基础值`是`属性`的永久值，而`当前值`则是`基础值`加上`游戏效果`的临时修改值。例如，您的角色可能有一个基础值为 600 单位/秒的移动速度属性。由于还没有`游戏效果`来修改移动速度，因此`当前值`也是 600 单位/秒。如果他获得了 50 单位/秒的临时移动速度加成，则`基础值`仍为 600 单位/秒，而`当前值`则为 600 + 50，总计 650 单位/秒。移动速度 buff 到期后，`当前值`将恢复为 600 单位/秒 的`基础值`。

GAS 初学者经常会将`基础值`与`属性`的最大值相混淆，并试图将其视为最大值。这种做法是不正确的。`属性的最大值`可以改变，也会在技能或用户界面中被引用，因此应将这种最大值视为单独的`属性`。对于硬编码的最大值和最小值，有一种方法可以使用，以 FAttributeMetaData 定义一个数据表，该数据表可以设置最大值和最小值。但 Epic 在该结构上方的注释中标记着 "正在进行中"，更多信息请参见 `AttributeSet.h`。为防止混淆，我建议将可在能力或用户界面中引用的最大值作为单独的`属性`，而将仅用于限制属性的硬编码最大值和最小值定义为`属性集`中的硬编码浮点数。属性限制会在 [PreAttributeChange()](#concepts-as-preattributechange) 和 [PostGameplayEffectExecute()](#concepts-as-postgameplayeffectexecute) 中讨论，前者用于更改`当前值`，后者用于更改来自`游戏效果`的`基础值`。

`即时`的`游戏效果`会对`基础值`产生永久更改，而`持续`和`无限`类型的`游戏效果`则会更改`当前值`。周期性`游戏效果`的处理方式与`即时`的`游戏效果`相同，也会改变`基础值`。

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-a-meta"></a>
#### 4.3.3 元属性
某些 `属性` 属性被视为临时的中介，这些临时值的目的是与`属性`交互，被称为`元属性`。例如，我们通常将伤害定义为`元属性`。我们不使用`游戏效果`直接改变血量属性，而是使用名为伤害的元属性作为中介。这样，伤害值就可以在 [`GameplayEffectExecutionCalculation`](#concepts-ge-ec)中通过 buff 和 debuff 修改，并可以在`属性集`中进一步操作，例如从当前护盾属性中减去伤害，最后再从血量中减去余下的伤害。伤害`元属性`在不同的`游戏效果`之间没有持久性，会被每个`游戏效果`覆盖。`元属性`通常不会复制。
`元属性`在 "我们造成了多少伤害？"和 "我们如何处理这些伤害？"之间为伤害和治疗等事项提供了良好的逻辑分隔。这种逻辑分隔意味着我们的`游戏效果`和`执行计算`不需要知道目标是如何处理伤害的。比如我们的伤害示例中，`游戏效果`决定伤害程度，然后`属性集`决定如何处理该伤害。并非所有角色都拥有相同的`属性`，尤其是在使用子类`属性集`的情况下。父类`属性集`类可能只有血量属性，但子类`属性集`可能会添加护盾`属性`。带有护盾`属性`的子类`属性集`将以不同于父类`属性集`类的方式分配收到的伤害。

虽然`元属性`是一种很好的设计模式，但并不是必须的。如果您只有一个用于所有伤害实例的`执行计算`和一个所有角色共享的`属性集`类，那么您可以在`执行计算`中对血量、护盾等进行伤害分配，并直接修改这些属性。这样做会牺牲一点灵活性，但对你来说也许问题不大。

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-a-changes"></a>
#### 4.3.4 响应属性的修改
要监听`属性`变化以更新 UI 或其他游戏玩法，请使用 `UAbilitySystemComponent::GetGameplayAttributeValueChangeDelegate(FGameplayAttribute Attribute)`。此函数返回一个委托，您可以绑定该委托，每当`属性`发生变化时，该委托就会被自动调用。委托会提供一个 `FOnAttributeChangeData` 参数，其中包含 `NewValue`、`OldValue` 和 `FGameplayEffectModCallbackData`。**注意：** `FGameplayEffectModCallbackData` 只会在服务器上设置。

```c++
AbilitySystemComponent->GetGameplayAttributeValueChangeDelegate(AttributeSetBase->GetHealthAttribute()).AddUObject(this, &AGDPlayerState::HealthChanged);
```

```c++
virtual void HealthChanged(const FOnAttributeChangeData& Data);
```

示例项目中，绑定了 `GDPlayerState` 上的`属性`值更改委托，以更新 HUD 并在血量值为零时对玩家死亡做出响应。

示例项目中包含一个自定义蓝图节点，将属性值的更改事件封装为 `ASyncTask`。它用于 `UI_HUD` UMG 组件，以更新血量值、法力值和体力值。在手动调用 `EndTask()` 之前，这个 `AsyncTask` 将永远存在，我们在 `UMG` 组件的 `Destruct` 事件中调用了 `EndTask()`。请参见 `AsyncTaskAttributeChanged.h/cpp`。

![监听属性值更改的蓝图节点](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/attributechange.png)

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-a-derived"></a>
#### 4.3.5 派生属性
要使一个`属性`的部分或全部值来源于一个或多个其他`属性`，可以使用若干`无限`类型`游戏效果`，并且让这些效果带有`基于属性的`或 [`MMC`](#concepts-ge-mmc) [`修改器`](#concepts-ge-mods)。当`派生属性`所依赖的`属性`更新时，`派生属性`将自动更新。

`派生属性`上所有`修改器`的最终计算公式与`修改聚合器（Modifier Aggregators）`的计算公式相同。如果需要按特定顺序计算，请在 `MMC` 中完成所有计算。

```
((CurrentValue + Additive) * Multiplicitive) / Division
```

**注意：** 如果在 PIE 中使用多个客户端，则需要在编辑器偏好设置中禁用 "在一个进程下运行"（Run Under One Process），否则当派生属性所依赖的属性在第一个客户端以外的客户端上更新时，派生属性将不会更新。

在这个例子中，我们有一个`无限游戏效果（Infinite GameplayEffect）`，它从属性 `TestAttrB` 和 `TestAttrC` 派生出 `TestAttrA` 的值，公式为 `TestAttrA = (TestAttrA + TestAttrB) * ( 2 * TestAttrC)`。每当任何属性值更新时，`TestAttrA` 都会自动重新计算。

![派生属性示例](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/derivedattribute.png)

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-as"></a>
### 4.4 属性集 / Attribute Set

<a name="concepts-as-definition"></a>
#### 4.4.1 属性集的定义
`属性集`定义、保存和管理对`属性`的更改。开发者需要从 [`UAttributeSet`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/UAttributeSet/index.html) 派生出子类。在 `OwnerActor` 的构造函数中创建一个 `AttributeSet` 会自动将其注册到 `ASC` 中。**这个操作必须在 C++ 中完成**。  

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-as-design"></a>
#### 4.4.2 设计属性集
一个 `ASC` 可以有一个或多个`属性集`。`属性集`的内存开销可以忽略不计，因此使用多少个`属性集`由开发者自行决定。

游戏中的每个角色都可以共享一个大型的单一`属性集`，只在需要时使用特定的属性，而忽略未使用的属性。

另外，您也可以选择拥有一个以上的`属性集`来为`属性`分组，并根据需要有选择性地添加到角色中。例如，您可以为与血量相关的属性设置一个属性集，为与法力相关的属性设置一个属性集，等等。在 MOBA 游戏中，英雄可能需要法力值，但小兵可能不需要。因此，英雄会拥有法力`属性集`，而小兵则不会。

此外，`属性集`还可以子类化，这是另一种选择角色属性列表的方法。属性在内部被称为 `AttributeSetClassName.AttributeName`。当你子类化一个`属性集`时，父类的所有`属性`仍将以父类的名称作为前缀。

虽然 `ASC` 可以有多个属性集，但在一个 `ASC` 上不应该有多个同类的`属性集`。如果`ASC`中有多个同类的`属性集`，`ASC` 就不知道该使用哪个，只会选择其中一个。

<a name="concepts-as-design-subcomponents"></a>
##### 4.4.2.1 具有个别属性的子组件
如果在`Pawn`上有多个接受伤害的组件——比如多个分别计算耐久的装备。如果您知道`Pawn`上接受伤害组件的最大数量，我建议在一个属性集上创建多个血量`属性`——DamageableCompHealth0、DamageableCompHealth1 等，表示这些接受伤害的组件的逻辑“插槽”。在接受伤害的组件的类实例中指定槽号，`游戏技能`或 [	`Executions`](#concepts-ge-ec) 可以读取槽号，从而知道要对哪个`属性`造成伤害。`Pawn`的接受伤害的组件数量少于最大值或为零也没有问题。`属性集`拥有一个`属性`并不意味着您必须使用它。未使用的`属性`占用的内存微不足道。

如果您的子组件每个都需要很多`属性`，子组件的数量有可能是无上限的，或者子组件可以分离并被其他玩家使用（例如武器），或者任何其他原因。那么这种方法不适合，我建议您放弃使用`属性`，而改为在组件上存储普通的浮点数。请参阅[物品属性](#concepts-as-design-itemattributes)一节。

<a name="concepts-as-design-addremoveruntime"></a>
##### 4.4.2.2 运行时增删属性集
`属性集`可以在运行时从 `ASC` 中添加和移除；但是，移除`属性集`可能会有危险。例如，如果在客户端先于服务器移除一个`属性集`，而`属性`值的变化此时被复制到客户端，那么`属性`将找不到它的`属性集`，从而导致游戏崩溃。

添加武器的时候：
```c++
AbilitySystemComponent->GetSpawnedAttributes_Mutable().AddUnique(WeaponAttributeSetPointer);
AbilitySystemComponent->ForceReplication();
```

删除武器的时候：
```c++
AbilitySystemComponent->GetSpawnedAttributes_Mutable().Remove(WeaponAttributeSetPointer);
AbilitySystemComponent->ForceReplication();
```
<a name="concepts-as-design-itemattributes"></a>
##### 4.4.2.3 道具属性（武器弹药）
有几种方法可以实现带有`属性`（武器弹药、护甲耐久度等）的可装备物品。所有这些方法都是直接在物品上存储数值。对于在其生命周期内可被多个玩家装备的物品来说，这个很必要。

> 1. 在道具上使用普通的浮点数（**推荐**）
> 1. 道具单独使用`属性集`
> 1. 道具单独使用`ASC`

<a name="concepts-as-design-itemattributes-plainfloats"></a>
###### 4.4.2.3.1 在道具上使用普通的浮点数
在物品类实例中存储纯浮点数值，而非`属性`。《堡垒之夜》和[《GASShooter》](https://github.com/tranek/GASShooter)就是这样处理枪支弹药的。对于枪支，可将最大弹夹大小、弹夹中的当前弹药、储备弹药等直接作为可复制的浮点数（COND_OwnerOnly）存储在枪支实例上。如果武器共享后备弹药，则应将后备弹药作为共享弹药`属性集`中的一个`属性`移动到角色上（装弹技能可以使用`消耗性效果` 从后备弹药中提取弹药到弹夹中）。由于您没有为当前弹夹弹药使用 属性，因此需要覆盖 `UGameplayAbility` 中的一些函数来检查枪上的浮动弹夹并处理消耗。在授予技能时，将枪作为 [`GameplayAbilitySpec`](https://github.com/tranek/GASDocumentation#concepts-ga-spec) 中的`源对象（SourceObject）`意味着您将可以访问在技能中授予技能的这把枪。

为了防止枪在自动射击时复制弹药量，破坏本地弹药量数据，请在玩家在 `PreReplication()` 函数中检查，如果有 `IsFiring` `游戏标签` 时禁用复制。在这里，你基本上是在进行自己的本地预测。

```c++
void AGSWeapon::PreReplication(IRepChangedPropertyTracker& ChangedPropertyTracker)
{
	Super::PreReplication(ChangedPropertyTracker);

	DOREPLIFETIME_ACTIVE_OVERRIDE(AGSWeapon, PrimaryClipAmmo, (IsValid(AbilitySystemComponent) && !AbilitySystemComponent->HasMatchingGameplayTag(WeaponIsFiringTag)));
	DOREPLIFETIME_ACTIVE_OVERRIDE(AGSWeapon, SecondaryClipAmmo, (IsValid(AbilitySystemComponent) && !AbilitySystemComponent->HasMatchingGameplayTag(WeaponIsFiringTag)));
}
```
优点：
1. 避免了使用`属性集`的限制（见下文）

局限性：
1. 无法使用现有的`游戏效果`工作流程（使用弹药的`消耗效果`等）
1. 需要覆盖 `UGameplayAbility` 的关键功能，以便根据枪支的浮点属性来检查和应用弹药成本

<a name="concepts-as-design-itemattributes-attributeset"></a>
###### 4.4.2.3.2 道具单独使用`属性集`
在物品上使用单独的`属性集`，并在[将其添加到玩家库存时将其添加到玩家的 ASC 中](#concepts-as-design-addremoveruntime) 是可行的，但它有一些重要的限制。我曾在 [GASShooter](https://github.com/tranek/GASShooter) 的早期版本中为武器弹药使用过这种方法。武器将其`属性`（如最大弹夹大小、弹夹中的当前弹药、备用弹药等）存储在武器类的`属性集`中。如果武器共享后备弹药，则会将后备弹药移到角色的共享弹药`属性集`中。当武器被添加到服务器上玩家的库存中时，武器会将其`属性集`添加到玩家的 `ASC::SpawnedAttributes` 中。然后服务器会复制到客户端。如果武器从库存中移除，则会从 `ASC::SpawnedAttributes` 中移除其`属性集`。

当`属性集`位于 `OwnerActor` 以外（例如武器）时，最初会在`属性集`中出现一些编译错误。解决方法是在 `BeginPlay()` 而非构造函数中构建`属性集`，并在武器上实现 `IAbilitySystemInterface`（将武器添加到玩家库存时设置指向 `ASC` 的指针）。

```c++
void AGSWeapon::BeginPlay()
{
	if (!AttributeSet)
	{
		AttributeSet = NewObject<UGSWeaponAttributeSet>(this);
	}
	//...
}
```
你可以查看[旧版本的 GASShooter](https://github.com/tranek/GASShooter/tree/df5949d0dd992bd3d76d4a728f370f2e2c827735) 来了解实际用法。

优点：
1. 可使用现有的`游戏技能`和`游戏效果`工作流程（使用弹药的消耗效果等）。
1. 设置简单，只需为很少的一些道具设置这个属性集。

局限性：
1. 您必须为每种武器类型创建一个新的`属性集`类。`ASC` 在功能上只能拥有一个`属性集`类实例，因为对`属性`的更改会在 `ASC` 的` "生成属性"（SpawnedAttributes）`数组中查找其`属性`集类的第一个实例。同一`属性集`类的其他实例将被忽略。
1. 由于之前每个`属性集`类只能有一个`属性集`实例的原因，玩家的库存中每种类型的武器只能有一件。
1. 删除`属性集`是很危险的。在《GASShooter》中，如果玩家被火箭弹炸死，就会立即从库存中删除火箭发射器，当然也包括 `ASC` 中的`属性集`。当服务器复制火箭发射器的弹药`属性`发生变化时，客户端的 `ASC` 上就不再存在该`属性集`，游戏就会崩溃。

<a name="concepts-as-design-itemattributes-asc"></a>
###### 4.4.2.3.3 道具单独使用`ASC`
将整个`ASC`放在每个物品上是一种极端的做法。我本人没有这样做过，也没有在正常情况下见过。这需要大量的工程设计才能实现。

> **是否可以拥有多个拥有者相同但角色不同的 ASC（例如，拥有者设置为 PlayerState 的 Pawn 和武器/物品/投射物上的 ASC）？**  
> 
> 我看到的第一个问题是需要在拥有者角色上实现 IGameplayTagAssetInterface 和 IAbilitySystemInterface。前者也许是可行的：只需聚合来自所有 ASC 的标签（但要注意，只有通过跨 ASC 聚合才能满足 -HasAllMatchingGameplayTags 的要求。仅仅将该调用转发给每个 ASC 并将结果 OR 在一起是不够的）。但后面的问题更加棘手：哪个 ASC 才是权威？如果有人想申请一个GE，应该由哪个 ASC 接收？也许您可以解决这些问题，但这一方面的问题将是最棘手的：Owner 下面将有多个 ASC。
> 
> 不过，在角色和武器上分别设置 ASC 也是有道理的。例如，区分描述武器的标签和描述拥有武器的角色的标签。也许赋予武器的标签也“适用于”武器拥有者，而不是其他（例如，属性和通用属性是独立的，但武器拥有者会像我上面描述的那样将拥有的标签聚合在一起）。我相信这可以行得通。但是，如果多个 ASC 的所有者都是同一个人，可能会很棘手。
> 
> *来自 Epic 的 Dave Ratti 的回答，[社区问题 #6](https://epicgames.ent.box.com/s/m1egifkxv3he3u3xezb9hzbgroxyhx89)*

优点：
可以使用现有的`游戏技能`和`游戏效果`工作流程（使用弹药的消耗效果等）
可重复使用`属性集`类（每种武器的 ASC 上都有一个`属性集`类）

局限性：
工程成本未知
真的可行吗？

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-as-attributes"></a>
#### 4.4.3 定义属性
**属性只能在`属性集`的头文件中用 C++ 定义**。建议在每个`属性集`头文件的顶部添加此宏块。它将自动为属性生成 getter 和 setter 函数。

```c++
// Uses macros from AttributeSet.h
#define ATTRIBUTE_ACCESSORS(ClassName, PropertyName) \
	GAMEPLAYATTRIBUTE_PROPERTY_GETTER(ClassName, PropertyName) \
	GAMEPLAYATTRIBUTE_VALUE_GETTER(PropertyName) \
	GAMEPLAYATTRIBUTE_VALUE_SETTER(PropertyName) \
	GAMEPLAYATTRIBUTE_VALUE_INITTER(PropertyName)
```

复制的血量属性可以这样定义：
```c++
UPROPERTY(BlueprintReadOnly, Category = "Health", ReplicatedUsing = OnRep_Health)
FGameplayAttributeData Health;
ATTRIBUTE_ACCESSORS(UGDAttributeSetBase, Health)
```

同时在头文件中定义 `OnRep` 函数：
```c++
UFUNCTION()
virtual void OnRep_Health(const FGameplayAttributeData& OldHealth);
```

在 .cpp 文件的 `OnRep` 函数实现部分，填充 `GAMEPLAYATTRIBUTE_REPNOTIFY` 宏，以便预测系统使用：
```c++
void UGDAttributeSetBase::OnRep_Health(const FGameplayAttributeData& OldHealth)
{
	GAMEPLAYATTRIBUTE_REPNOTIFY(UGDAttributeSetBase, Health, OldHealth);
}
```

最后，需要把`属性`注册到`GetLifetimeReplicatedProps`：
```c++
void UGDAttributeSetBase::GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& OutLifetimeProps) const
{
	Super::GetLifetimeReplicatedProps(OutLifetimeProps);

	DOREPLIFETIME_CONDITION_NOTIFY(UGDAttributeSetBase, Health, COND_None, REPNOTIFY_Always);
}
```


`REPNOTIFY_Always` 会告诉 `OnRep` 函数，本地值是否已经等于从服务器重置下来的值（由于预测），是否应该触发 `OnRep` 函数。默认情况下，如果本地值与服务器下传的值相同，则不会触发。

如果`属性`没有复制动作，类似`元属性`，则可以跳过 `OnRep` 和 `GetLifetimeReplicatedProps` 步骤。

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-as-init"></a>
#### 4.4.4 属性初始化
有多种方法可以初始化属性，也就是将其`基础值`和`当前值`设置为某个初始值。Epic 建议使用即时`游戏效果`。这也是示例项目中使用的方法。

请参阅示例项目中的 `GE_HeroAttributes` 蓝图，了解如何制作即时`游戏效果`来初始化`属性`。该`游戏效果`在 C++ 中启用。

如果您在定义`属性`时使用了 `ATTRIBUTE_ACCESSORS` 宏，那么`属性集`将自动为每个`属性`生成一个初始化函数，您可以在 C++ 中随意调用该函数。

```c++
// InitHealth(float InitialValue) is an automatically generated function for an Attribute 'Health' defined with the `ATTRIBUTE_ACCESSORS` macro
AttributeSet->InitHealth(100.0f);
```

有关初始化`属性`的更多方法，请参阅 `AttributeSet.h`。

**注意：**在 4.24 之前，`FAttributeSetInitterDiscreteLevels` 无法与 `FGameplayAttributeData` 配合使用。它是为原始浮点数属性创建的，并且会报错 `FGameplayAttributeData` 不是普通旧数据 (`Plain Old Data`，POD)。这一问题已在 4.24 https://issues.unrealengine.com/issue/UE-76557 中得到修复。

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-as-preattributechange"></a>
#### 4.4.5 PreAttributeChange()
`PreAttributeChange(const FGameplayAttribute& Attribute, float& NewValue)` 是`属性集`的主要函数之一，用于在`属性`的`当前值`发生变化之前对变化做出响应。它可以通过引用参数 `NewValue` 来限制`当前值`的变化范围。

例如，为了限制移动速度修改器，示例项目是这样做的：
```c++
if (Attribute == GetMoveSpeedAttribute())
{
	// 速度不能低于 150 units/s，不能高于 1000 units/s
	NewValue = FMath::Clamp<float>(NewValue, 150, 1000);
}
```
`GetMoveSpeedAttribute()` 函数由我们添加到 `AttributeSet.h` ([定义属性](#concepts-as-attributes)）中的宏创建。

无论是使用`属性`设置器（由 `AttributeSet.h`([定义属性](#concepts-as-attributes)）中的宏块定义）还是使用`游戏效果`，对`属性`的任何更改都会触发该函数。

**注意：**此处发生的任何限制都不会永久更改 `ASC` 上的修改器。它只会更改通过查询修改器返回的值。这意味着任何从修改器（如 [`GameplayEffectExecutionCalculations`](#concepts-ge-ec) 和 [`ModifierMagnitudeCalculations`](#concepts-ge-mmc)）中重新计算`当前值`的操作都会再次经过限制。

**注意：**Epic 在 `PreAttributeChange()` 的注释中指出，不要将其用于游戏事件，而应主要用于限制。属性更改时处理游戏事件的推荐位置是 `UAbilitySystemComponent::GetGameplayAttributeValueChangeDelegate(FGameplayAttribute Attribute)`（[响应属性更改](#concepts-a-changes)）。

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-as-postgameplayeffectexecute"></a>
#### 4.4.6 PostGameplayEffectExecute()
`PostGameplayEffectExecute(const FGameplayEffectModCallbackData & Data)`仅在即时[`游戏效果`](#concepts-ge)的`属性`的`基础值`发生变化后触发。当属性由于`游戏效果`发生变化时，这是里可以进行更多`属性`操作。

例如，在示例项目中，我们在这里从血量`属性`中减去`元属性`最终伤害。如果有护盾`属性`，我们会先从护盾`属性`中减去伤害，然后再从血量中减去未抵消的部分。示例项目还使用这个位置来播放命中反应动画、显示浮动的伤害数字，以及为击杀者分配经验和金币赏金。根据设计，伤害`元属性`将始终通过即时`游戏效果`而非`属性`的 setter 产生。

其他只能通过即时`游戏效果`改变`基础值`的`属性`，如法力值和体力值，也可以在这里根据最大值对应的`属性`做出限制。

**注意：**当调用 `PostGameplayEffectExecute()` 时，`属性`的变化已经发生，但还没有复制到客户端，因此在这里限制属性值不会导致客户端收到两次网络更新。客户端只会在限制后收到更新。

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-as-onattributeaggregatorcreated"></a>
#### 4.4.7 OnAttributeAggregatorCreated()
`OnAttributeAggregatorCreated(const FGameplayAttribute& Attribute, FAggregator* NewAggregator)` 在为此集合中的一个`属性`创建`聚合器（Aggregator）`时触发。它允许自定义设置 [`FAggregatorEvaluateMetaData`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/FAggregatorEvaluateMetaData/index.html)。`AggregatorEvaluateMetaData` 用于`聚合器`，`聚合器`根据所有[`修改器`](#concepts-ge-mods)计算`属性`的`当前值`。默认情况下，`聚合器`仅仅使用 `AggregatorEvaluateMetaData` 来确定哪些`修改器`符合条件，例如 `MostNegativeMod_AllPositiveMods` 允许使用所有正`修改器`，但限制负`修改器`中只有最负的一个才能起作用。《Paragon》 使用此方法只允许玩家身上最负面的减速buff生效，而不管玩家身上同时有多少个减速buff，同时所有正面的移动速度buff都会生效。不符合条件的`修改器`仍然存在于 `ASC` 上，只是没有汇总到当前的最终值中。一旦条件发生变化，它们就有可能在一段时间后符合条件，例如，如果最负面的`修改器`过期，下一个最负面的`修改器`（如果存在的话）就会符合条件。

在示例中使用 `AggregatorEvaluateMetaData`，只启用最负`修饰符`和所有正`修饰符`：
```c++
virtual void OnAttributeAggregatorCreated(const FGameplayAttribute& Attribute, FAggregator* NewAggregator) const override;
```

```c++
void UGSAttributeSetBase::OnAttributeAggregatorCreated(const FGameplayAttribute& Attribute, FAggregator* NewAggregator) const
{
	Super::OnAttributeAggregatorCreated(Attribute, NewAggregator);

	if (!NewAggregator)
	{
		return;
	}

	if (Attribute == GetMoveSpeedAttribute())
	{
		NewAggregator->EvaluationMetaData = &FAggregatorEvaluateMetaDataLibrary::MostNegativeMod_AllPositiveMods;
	}
}
```

如果需要自定义的 `AggregatorEvaluateMetaData`， 应作为静态变量添加到 `FAggregatorEvaluateMetaDataLibrary` 中。

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ge"></a>
### 4.5 游戏效果 / GameplayEffect / GE

<a name="concepts-ge-definition"></a>
#### 4.5.1 游戏效果的定义
[`游戏效果`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/UGameplayEffect/index.html) (`GE`) 是技能改变自身和他人[`属性`](#concepts-a)和[`游戏标签`](#concepts-gt)的媒介。 它们可以立即改变`属性`（如伤害或治疗），也可以应用长期的状态缓冲/减弱（如移动速度提升或眩晕）`UGameplayEffect` 类是一个**纯数据**类，用于定义单一的游戏效果。不应在 `GameplayEffect` 中添加任何附加逻辑。通常情况下，设计者会创建许多 `UGameplayEffect` 的蓝图子类。

`游戏效果` 通过 [`修饰器/Modifier`](#concepts-ge-mods) 和 [`Executions` (`GameplayEffectExecutionCalculation`)](#concepts-ge-ec) 修改 `属性` .

`游戏效果` 有三种持续时间："Instant"（即时）、"Duration"（持续）和 "Infinite"（无限）。

此外，`游戏效果` 还可以添加/执行 [`游戏信号/GameplayCue`](#concepts-gc)。`即时 游戏效果` 会调用 游戏信号和游戏标签 上的 `Execute`，而持续时间或无限 游戏效果 则会调用 游戏信号和游戏标签 上的 `Add` 和 `Remove`。

| 持续类型 | 提示事件 | 何时使用                                                                                                                                                                                                                                |
| ------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `即时`     | Execute           | 立即永久更改属性的 BaseValue。不会应用 GameplayTags，甚至不会应用一帧。                                                                                                                    |
| `持续`    | Add & Remove      | 用于临时更改`属性`的`当前值`和应用`游戏标签`，这些标签将在`游戏效果`过期或手动移除时一同移除。持续时间在 UGameplayEffect 类/蓝图中指定。       |
| `无限`    | Add & Remove      | 用于临时更改`属性`的`当前值`和应用`游戏标签`，这些标签会在`游戏效果`移除时一同移除。这种`标签`永远不会自行失效，必须由技能或 `ASC` 手动移除。 |

`持续`和`无限``游戏效果`可以选择应用`周期性效果`（Periodic Effects），根据周期的定义，每 X 秒应用一次`修改器`和`执行器`。在更改属性的`基础值`和执行`游戏信号`时，周期效果被视为即时游戏效果。这对于随时间变化的伤害 (DOT) 类型效果非常有用。**注意：**周期效果无法[预测](#concepts-p)。

如果`持续`和`无限`类型`游戏效果`满足或不满足其`持续标签`要求（[游戏效果标签](#concepts-ge-tags)），则可以在应用后暂时开启或关闭。关闭`游戏效果`会移除其`修改器`和应用的`游戏标签`的效果，但不会移除`游戏效果`。重新打开`游戏效果`会重新应用其`修改器`和 `游戏标签`。

如果您需要手动刷新`持续`或`无限`游戏效果的修改器（例如您有一个使用非`属性`数据的 MMC），您可以调用`UAbilitySystemComponent::ActiveGameplayEffects.SetActiveGameplayEffectLevel(FActiveGameplayEffectHandle ActiveHandle, int32 NewLevel)` ，其中 level 参数从 `UAbilitySystemComponent::ActiveGameplayEffects.GetActiveGameplayEffect(ActiveHandle).Spec.GetLevel()` 获取。当支持`属性`更新时，基于支持`属性`的`修改器`也会自动更新。`SetActiveGameplayEffectLevel()` 更新修改器的关键函数是

```C++
MarkItemDirty(Effect);
Effect.Spec.CalculateModifierMagnitudes();
//这里是 Private 函数，否则我们将直接调用这三个函数，而无需将 level 设置为原来的值
UpdateAllAggregatorModMagnitudes(Effect);
```

`游戏效果`通常不会被实例化。当一个技能或 `ASC` 想要应用一个`游戏效果`时，它会从 `游戏效果`的 ClassDefaultObject 中创建一个 [`游戏效果实例 / GameplayEffectSpec`](#concepts-ge-spec)。应用成功的 `GameplayEffectSpec` 会被添加到一个名为 `FActiveGameplayEffect` 的新结构中，`ASC` 会在一个名为 `ActiveGameplayEffects` 的特殊容器结构中跟踪该结构。

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ge-applying"></a>
#### 4.5.2 应用游戏效果
`游戏效果`可以通过多种方式应用，包括 [`游戏技能`](#concepts-ga) 上的函数和 `ASC` 上的函数，通常采用 `ApplyGameplayEffectTo` 的形式。不同的函数本质上都是便利函数，最终都会调用目标上的 `UAbilitySystemComponent::ApplyGameplayEffectSpecToSelf()` 。

要在 `游戏技能` 之外应用 `游戏效果`（例如来自子弹的效果），您需要获取目标的 ASC 并使用其中一个函数 `ApplyGameplayEffectToSelf`。

当任何`持续`或`无限`类型`游戏效果`应用到 `ASC` 时，会触发事件，您可以绑定到其委托以监听：

```c++
AbilitySystemComponent->OnActiveGameplayEffectAddedDelegateToSelf.AddUObject(this, &APACharacterBase::OnActiveGameplayEffectAddedCallback);
```
回调函数：
```c++
virtual void OnActiveGameplayEffectAddedCallback(UAbilitySystemComponent* Target, const FGameplayEffectSpec& SpecApplied, FActiveGameplayEffectHandle ActiveHandle);
```

无论复制模式如何，服务器始终会调用此函数，。自主代理只会为 `Full` 和 `Mixed` 复制模式中的已复制 `游戏效果` 调用此函数。模拟代理只会在此复制模式下在 `Full` [复制模式](#concepts-asc-rm)中调用此函数。

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ga-removing"></a>
#### 4.5.3 移除游戏效果
`游戏效果`可以通过多种方式移除，包括 [`游戏技能`](#concepts-ga) 上的函数和 `ASC` 上的函数，通常采用 `RemoveActiveGameplayEffect` 的形式。不同的函数本质上都是便利函数，最终都会调用目标上的 `FActiveGameplayEffectsContainer::RemoveActiveEffects()` 。

要在`游戏效果`之外移除 `游戏技能` 例如来自子弹的效果），您需要获取目标的 `ASC` 并使用其中一个函数 `RemoveActiveGameplayEffect`。

您可以在 `ASC` 上绑定一个委托来监听任何 `持续` 或 `无限` 的 `游戏效果` 被移除：

```c++
AbilitySystemComponent->OnAnyGameplayEffectRemovedDelegate().AddUObject(this, &APACharacterBase::OnRemoveGameplayEffectCallback);
```

回调函数：
```c++
virtual void OnRemoveGameplayEffectCallback(const FActiveGameplayEffect& EffectRemoved);
```

无论复制模式如何，服务器始终会调用此函数。自主代理只会为 `Full` 和 `Mixed` 复制模式中的已复制 `游戏效果` 调用此函数。模拟代理只会在 `Full` [复制模式](#concepts-asc-rm)中调用此函数。

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ge-mods"></a>
#### 4.5.4 游戏效果修改器

<!--en-->  
`Modifiers` change an `Attribute` and are the only way to [predictively](#concepts-p) change an `Attribute`. A `GameplayEffect` can have zero or many `Modifiers`. Each `Modifier` is responsible for changing only one `Attribute` via a specified operation.  
<!--/en-->  

<!--cn-->  
`修改器` 负责修改 `属性` ，并且是唯一能[预测](#concepts-p)`属性`修改的方式。`游戏效果` 可以有零个或多个 `修改器`。每个 `修改器` 负责通过指定的操作仅更改一个 `属性`。  
<!--/cn-->  

| Operation/操作  | Description/描述                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------- |
| `Add`      | Adds the result to the `Modifier's` specified `Attribute`. Use a negative value for subtraction.<br> 将结果与`修改器`指定的`属性`相加。负值代表减法。                    |
| `Multiply` | Multiplies the result to the `Modifier's` specified `Attribute`. <br> 将结果与`修改器`指定的`属性`相乘。                                                   |
| `Divide`   | Divides the result against the `Modifier's` specified `Attribute`. <br> 将结果与`修改器`指定的`属性`相除。                                                 |
| `Override` | Overrides the `Modifier's` specified `Attribute` with the result.<br>用结果覆盖`修改器`指定的`属性`。                                                  |

<!--en-->  
The `CurrentValue` of an `Attribute` is the aggregate result of all of its `Modifiers` added to its `BaseValue`. The formula for how `Modifiers` are aggregated is defined as follows in `FAggregatorModChannel::EvaluateWithBase` in `GameplayEffectAggregator.cpp`:  
<!--/en-->  

`修改器` 的 `当前值` 是所有 `修改器` 添加到 `基础值` 的总和。`修改器` 聚合的公式定义在 `GameplayEffectAggregator.cpp` 中的 `FAggregatorModChannel::EvaluateWithBase` 中：  
```c++
((InlineBaseValue + Additive) * Multiplicitive) / Division
```
 
<!--en-->  
Any `Override` `Modifiers` will override the final value with the last applied `Modifier` taking precedence.  
<!--/en-->  

任何`Override` `修改器`都会覆盖`修改器`的最终值，最终值取决于最后一个`修改器`。 

<!--en-->  
**Note:** For percentage based changes, make sure to use the `Multiply` operation so that it happens after addition.  
<!--/en-->  

**注意：** 对于百分比修改的`修改器`，请使用`Multiply`，以便在添加后起作用。  

**Note:** [Prediction](#concepts-p) has trouble with percentage changes.  
**注意：** [预测](#concepts-p) 难以处理百分比变化。  

<!--en-->  
There are four types of `Modifiers`: Scalable Float, Attribute Based, Custom Calculation Class, and Set By Caller. They all generate some float value that is then used to change the specified `Attribute` of the `Modifier` based on its operation.  
<!--/en-->  

`修改器`有四种类型：可缩放浮点数、基于属性的、自定义计算类和由调用者设置的。它们都生成一些浮点值，然后使用它们的操作来改变`修改器`指定的`属性`。  

| `Modifier` Type/`修改器`类型            | Description/描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Scalable Float`<br>           | `FScalableFloats` are a structure that can point to a Data Table that has the variables as rows and levels as columns. The Scalable Floats will automatically read the value of the specified table row at the ability's current level (or different level if overriden on the [`GameplayEffectSpec`](#concepts-ge-spec)). This value can further be manipulated by a coefficient. If no Data Table/Row is specified, it treats the value as a 1 so the coefficient can be used to hard code in a single value at all levels. ![ScalableFloat](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/scalablefloats.png)<br>`FScalableFloats` 是一种可以指向数据表的结构，该数据表以变量为行，以等级为列。可缩放浮点数会自动读取指定表格行在能力当前等级（或不同等级，如果在[`GameplayEffectSpec`](#concepts-ge-spec)中被覆盖）下的值。该值还可以通过系数进一步操作。如果没有指定数据表/行，则会将该值视为 1，因此可以使用系数在所有等级中硬性编码一个值。                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `Attribute Based`          | `Attribute Based` `Modifiers` take the `CurrentValue` or `BaseValue` of a backing `Attribute` on the `Source` (who created the `GameplayEffectSpec`) or `Target` (who received the `GameplayEffectSpec`) and further modifies it with a coefficient and pre and post coefficient additions. `Snapshotting` means the backing `Attribute` is captured when the `GameplayEffectSpec` is created whereas no snapshotting means the `Attribute` is captured when the `GameplayEffectSpec` is applied.<br>基于属性的修改器会获取源（创建了 `GameplayEffectSpec` 的）或目标（接收了 `GameplayEffectSpec` 的）上的后备属性的 `当前值` 或 `基础值` ，并使用系数以及系数前后的附加值对其进行进一步修改。`快照`是指在创建`GameplayEffectSpec`时捕捉后备`属性`，而不快照是指在应用 `GameplayEffectSpec`时捕捉 `属性`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `Custom Calculation Class` | `Custom Calculation Class` provides the most flexibility for complex `Modifiers`. This `Modifier` takes a [`ModifierMagnitudeCalculation`](#concepts-ge-mmc) class and can further manipulate the resulting float value with a coefficient and pre and post coefficient additions.<br>`自定义计算类` 为复杂的`修改器`提供了最大的灵活性。该`修改器`采用 [`ModifierMagnitudeCalculation`](#concepts-ge-mmc) 类，并可通过系数、系数前添加和系数后添加进一步处理生成的浮点数值。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `Set By Caller`            | `SetByCaller` `Modifiers` are values that are set outside of the `GameplayEffect` at runtime by the ability or whoever made the `GameplayEffectSpec` on the `GameplayEffectSpec`. For example, you would use a `SetByCaller` if you want to set the damage to be based on how long the player held down a button to charge the ability. `SetByCallers` are essentially `TMap<FGameplayTag, float>` that live on the `GameplayEffectSpec`. The `Modifier` is just telling the `Aggregator` to look for a `SetByCaller` value associated with the supplied `GameplayTag`. The `SetByCallers` used by `Modifiers` can only use the `GameplayTag` version of the concept. The `FName` version is disabled here. If the `Modifier` is set to `SetByCaller` but a `SetByCaller` with the correct `GameplayTag` does not exist on the `GameplayEffectSpec`, the game will throw a runtime error and return a value of 0. This might cause issues in the case of a `Divide` operation. See [`SetByCallers`](#concepts-ge-spec-setbycaller) for more information on how to use `SetByCallers`. <br>`SetByCaller` `Modifiers` 是在运行时由技能或在 `GameplayEffectSpec` 上制作 `GameplayEffectSpec` 的人在 `GameplayEffect` 外部设置的值。例如，如果您想根据玩家按住按钮为该能力充电的时间来设置伤害，就需要使用 `SetByCaller`。`SetByCallers` 本质上是 `TMap<FGameplayTag, float>`，它位于 `GameplayEffectSpec` 中。`修改器`只是告诉`聚合器`寻找与所提供的`游戏标签`相关联的`SetByCaller`值。修改器使用的`SetByCaller`这里只能使用`游戏标签`。`FName` 版本不可使用。如果 `修改器` 被设置为 `SetByCaller` 但在 `GameplayEffectSpec` 中不存在具有正确 `GameplayTag` 的 `SetByCaller`，游戏将抛出运行时错误并返回 0 值。有关如何使用 `SetByCallers` 的更多信息，请参阅 [`SetByCaller`](#concepts-ge-spec-setbycaller)。 |

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ge-mods-multiplydivide"></a>
##### 4.5.4.1 乘法和除法修改器
<!--en-->  
By default, all `Multiply` and `Divide` `Modifiers` are added together before multiplying or dividing them into the `Attribute`'s `BaseValue`.  
<!--/en-->  
默认情况下，所有 `乘法` 和 `除法` `修改器` 都先求和，然后再乘以或除以它们。


```c++
float FAggregatorModChannel::EvaluateWithBase(float InlineBaseValue, const FAggregatorEvaluateParameters& Parameters) const
{
	...
	float Additive = SumMods(Mods[EGameplayModOp::Additive], GameplayEffectUtilities::GetModifierBiasByModifierOp(EGameplayModOp::Additive), Parameters);
	float Multiplicitive = SumMods(Mods[EGameplayModOp::Multiplicitive], GameplayEffectUtilities::GetModifierBiasByModifierOp(EGameplayModOp::Multiplicitive), Parameters);
	float Division = SumMods(Mods[EGameplayModOp::Division], GameplayEffectUtilities::GetModifierBiasByModifierOp(EGameplayModOp::Division), Parameters);
	...
	return ((InlineBaseValue + Additive) * Multiplicitive) / Division;
	...
}
```

```c++
float FAggregatorModChannel::SumMods(const TArray<FAggregatorMod>& InMods, float Bias, const FAggregatorEvaluateParameters& Parameters)
{
	float Sum = Bias;

	for (const FAggregatorMod& Mod : InMods)
	{
		if (Mod.Qualifies())
		{
			Sum += (Mod.EvaluatedMagnitude - Bias);
		}
	}

	return Sum;
}
```
*from `GameplayEffectAggregator.cpp`*

<!--en-->  
Both `Multiply` and `Divide` `Modifiers` have a `Bias` value of `1` in this formula (`Addition` has a `Bias` of `0`). So it would look something like: 
<!--/en-->   
对于`乘法`和`除法` `修改器`，这个公式中的`偏移`值为`1`——`加法修改器`的`偏移值`是`0`。所以它看起来像这样：  

```
1 + (Mod1.Magnitude - 1) + (Mod2.Magnitude - 1) + ...
```

<!--en-->  
This formula leads to some unexpected results. Firstly, this formula adds all the modifiers together before multiplying or dividing them into the `BaseValue`. Most people would expect it to multiply or divide them together. For example, if you have two `Multiply` modifiers of `1.5`, most people would expect the `BaseValue` to be multiplied by `1.5 x 1.5 = 2.25`. Instead, this adds the `1.5`s together to multiply the `BaseValue` by `2` (`50% increase + another 50% increase = 100% increase`). This was for the example from `GameplayPrediction.h` of a `10%` speed buff on `500` base speed would be `550`. Add another `10%` speed buff and it will be `600`.  
<!--/en-->  
这个公式导致了一些意想不到的结果。首先，这个公式将所有修改器加在一起，然后再将它们相乘或除以`基础值`。有些人以为它们应该连续相乘或相除。例如，如果你有两个`乘法`修改器值是`1.5`，有些人会以为`基础值`乘以`1.5 x 1.5 = 2.25`。相反，这个公式将`1.5`相加，再乘以`基础值`的`2`（`50% 增长 + 50% 增长 = 100% 增长`）。这是来自`GameplayPrediction.h`的例子：把`10%`速度增益增加到在`500`基础速度上，结果是`550`。如果再加一个`10%`速度增益，结果将是`600`。

<!--en-->  
Secondly, this formula has some undocumented rules about what values can be used as it was designed with Paragon in mind.  
<!--/en-->  
其次，这个公式在设计时考虑到了 Paragon，因此对于可以使用哪些值有一些未记录的规则。

<!--en-->  
Rules for `Multiply` and `Divide` multiplication addition formula:
* `(No more than one value < 1) AND (Any number of values [1, 2))`
* `OR (One value >= 2)`
<!--/en-->  

`乘法`和`除法`叠加公式的规则：  
* `（不超过一个值 < 1）AND（任意多个值 [1, 2)）`  
* `OR (一个值 >= 2)`  

<!--en-->  
The `Bias` in the formula basically subtracts out the integer digit of numbers in the range `[1, 2)`. The first `Modifier`'s `Bias` subtracts out from the starting `Sum` value (set to the `Bias` before the loop) which is why any value by itself works and why one value `< 1` will work with the numbers in the range `[1, 2)`.  
<!--/en-->  
公式中的`Bias`基本上是减去范围`[1, 2) `内数字的整数位数。第一个`修改器`的`偏移值`是从起始的`和`值（循环前设置的`偏移值`）中减去的，这就是为什么任何值都可以工作，以及为什么一个值`< 1`可以与范围`[1, 2)`中的数字一起工作。

<!--en--> 
Some examples with `Multiply`:  
Multipliers: `0.5`
`1 + (0.5 - 1) = 0.5`, 正确

乘数：`0.5, 0.5`  
`1 + (0.5 - 1) + (0.5 - 1) = 0`, incorrect expected `1`? Multiple values less than `1` don't make sense for adding multipliers. Paragon was designed to only use the [greatest negative value for `Multiply` `Modifiers`](#cae-nonstackingge) so there would only ever be at most one value less than `1` multiplying into the `BaseValue`.  

乘数：`1.1, 0.5`  
`1 + (0.5 - 1) + (1.1 - 1) = 0.6`, 正确

乘数：`5, 5`  
`1 + (5 - 1) + (5 - 1) = 9`, `10`是错误的. 答案永远是 `乘数的和 - 修改器的个数 + 1`.
<!--/en--> 

`乘法`的一些例子：

乘数：`0.5`  
`1 + (0.5 - 1) = 0.5`, 正确

乘数：`0.5, 0.5` 
`1 + (0.5 - 1) + (0.5 - 1) = 0`, 预期得到`1`是错误的？小于 `1` 的倍数值对乘数叠加没有意义。Paragon 的设计是只使用[最大负值用于`乘法``修改器``](#cae-nonstackingge)，因此最多只有一个小于`1`的值乘入`基础值`。

乘数：`1.1, 0.5`  
`1 + (0.5 - 1) + (1.1 - 1) = 0.6`, 正确

乘数：`5, 5`  
`1 + (5 - 1) + (5 - 1) = 9`, `10`是错误的. 答案永远是 `乘数的和 - 修改器的个数 + 1`.


<!--en--> 
Many games will want their `Multiply` and `Divide` `Modifiers` to multiply and divide together before applying to the `BaseValue`. To achieve this, you will need to **change the engine code** for `FAggregatorModChannel::EvaluateWithBase()`.  
<!--/en--> 
许多游戏希望他们的`乘法`和`除法``修改器`在应用到`基础值`之前连乘或连除到一起。为了实现这个目标，您将需要**更改引擎代码**，位置在`FAggregatorModChannel::EvaluateWithBase()`。

```c++
float FAggregatorModChannel::EvaluateWithBase(float InlineBaseValue, const FAggregatorEvaluateParameters& Parameters) const
{
	...
	float Multiplicitive = MultiplyMods(Mods[EGameplayModOp::Multiplicitive], Parameters);
	float Division = MultiplyMods(Mods[EGameplayModOp::Division], Parameters);
	...

	return ((InlineBaseValue + Additive) * Multiplicitive) / Division;
}
```

```c++
float FAggregatorModChannel::MultiplyMods(const TArray<FAggregatorMod>& InMods, const FAggregatorEvaluateParameters& Parameters)
{
	float Multiplier = 1.0f;

	for (const FAggregatorMod& Mod : InMods)
	{
		if (Mod.Qualifies())
		{
			Multiplier *= Mod.EvaluatedMagnitude;
		}
	}

	return Multiplier;
}
```

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ge-mods-gameplaytags"></a>
##### 4.5.4.2 修改器的游戏内标签


<!--en--> 
`SourceTags` and `TargetTags` can be set for each [Modifier](#concepts-ge-mods). They work the same like the [`Application Tag requirements`](#concepts-ge-tags) of a `GameplayEffect`. So the tags are considered only when the effect is applied. I.e. when having a periodic, infinite effect, they are only taken into consideration on the first application of the effect but *not* on each periodic execution.  
<!--/en--> 
可以为每个[修改器](#concepts-ge-mods)设置`源标签`（SourceTags）和 `目标标签`（TargetTags）。它们的作用与`游戏效果`的[应用标签要求](#concepts-ge-tags) 相同。因此，只有在应用效果时才会考虑这些标签。也就是说，当有一个周期性的无限效果时，只有在第一次应用该效果时才会考虑这些标签，而不是在每次周期性执行时。


<!--en--> 
`Attribute Based` Modifiers can also set `SourceTagFilter` and `TargetTagFilter`. When determining the magnitude of the attribute which is the source of the `Attribute Based` Modifier, these filters are used to exclude certain Modifiers to that attribute. Modifiers which source or target didn't have all of the tags of the filter are excluded.  
<!--/en--> 
`Attribute Based`修改器也可以设置`源标签过滤器`和`目标标签过滤器`。在确定`Attribute Based`修改器的属性作为源的属性时，这些过滤器用于排除某些修改器到该属性。如果修改器没有包含过滤器中的所有标签，则会被排除。


<!--en--> 
This means in detail: The tags of the source ASC and the target ASC are captured by `GameplayEffects`. The source ASC tags are captured, when the `GameplayEffectSpec` is created, the target ASC tags are captured on execution of the effect. When determining, if a Modifier of an infinite or duration effect "qualifies" to be applied (i.e. its Aggregator qualifies) and those filters are set, the captured tags are compared against the filters.  
<!--/en--> 
具体来说：`游戏效果`捕获源ASC和目标ASC的标签。当`GameplayEffectSpec`创建时，捕获源ASC的标签，当效果被执行时，捕获目标ASC的标签。在确定无限效果或持续效果的修改器是否 "有资格" 应用（即其聚合器有资格）以及这些过滤器是否已设置时，会将捕获的标记与过滤器进行比较。

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ge-stacking"></a>
<!--en--> 
#### 4.5.5 Stacking Gameplay Effects
<!--/en--> 
#### 4.5.5 堆叠游戏效果

<!--en--> 
`GameplayEffects` by default will apply new instances of the `GameplayEffectSpec` that don't know or care about previously existing instances of the `GameplayEffectSpec` on application. `GameplayEffects` can be set to stack where instead of a new instance of the `GameplayEffectSpec` is added, the currently existing `GameplayEffectSpec's` stack count is changed. Stacking only works for `Duration` and `Infinite` `GameplayEffects`.
<!--/en--> 

默认情况下，`游戏效果`将应用`GameplayEffectSpec`的新实例，这些实例不知道也不关心以前存在的`GameplayEffectSpec`实例。`游戏效果`可以设置为堆叠，在这种情况下，不会添加`GameplayEffectSpec`的新实例，而是更改当前存在的`GameplayEffectSpec`的堆叠计数。堆叠仅适用于`持续`和`无限`的`游戏效果`。


<!--en--> 
There are two types of stacking: Aggregate by Source and Aggregate by Target.
<!--/en--> 

有两种类型的堆叠：按源聚合和按目标聚合。

| Stacking Type / 堆叠类型       | Description / 描述                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Aggregate by Source<br>按源聚合 | There is a separate instance of stacks per Source `ASC` on the Target. Each Source can apply X amount of stacks.<br>目标上每个源`ASC`都有单独的堆叠实例。每个源都可以应用X层堆叠。                   |
| Aggregate by Target<br>按目标聚合| There is only one instance of stacks on the Target regardless of Source. Each Source can apply a stack up to the shared stack limit.<br>目标上只有一个堆叠实例，无论源。每个源都可以堆叠，只要不超过共享堆叠限制。 |

Stacks also have policies for expiration, duration refresh, and period reset. They have helpful hover tooltips in the `GameplayEffect` Blueprint.
堆栈也有过期、持续时间刷新和周期重置的策略。它们在 `游戏效果` 蓝图中有有用的悬停工具提示。

The Sample Project includes a custom Blueprint node that listens for `GameplayEffect` stack changes. The HUD UMG Widget uses it to update the amount of passive armor stacks that the player has. This `AsyncTask` will live forever until manually called `EndTask()`, which we do in the UMG Widget's `Destruct` event. See `AsyncTaskEffectStackChanged.h/cpp`.
示例项目中包含一个自定义蓝图节点，可侦听`游戏效果`堆叠的变化。HUD UMG 组件使用它来更新玩家拥有的被动装甲堆叠数量。在手动调用 `EndTask()` 之前，这个 `AsyncTask` 将一直存在，我们会在 UMG Widget 的 `析构` 事件中调用 `EndTask()`。请参阅 `AsyncTaskEffectStackChanged.h/cpp`。

![监听游戏效果堆叠变化的蓝图节点](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/gestackchange.png)

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ge-ga"></a>
#### 4.5.6 授予技能

<!--en--> 
`GameplayEffects` can grant new [`GameplayAbilities`](#concepts-ga) to `ASCs`. Only `Duration` and `Infinite` `GameplayEffects` can grant abilities.
<!--/en--> 
`游戏效果` 可以授予新的 [`游戏技能`](#concepts-ga) 到 `ASC`。只有 `持续` 和 `无限` `游戏效果` 可以授予技能。

<!--en--> 
A common usecase for this is when you want to force another player to do something like moving them from a knockback or pull. You would apply a `GameplayEffect` to them that grants them an automatically activating ability (see [Passive Abilities](#concepts-ga-activating-passive) for how to automatically activate an ability when it is granted) that does the desired action to them.
<!--/en--> 
常见的用例是当你想要强制另一个玩家做某事，比如强制击退或拉动玩家。你会给他们应用一个 `游戏效果`，授予他们一个自动激活的技能（见 [被动技能](#concepts-ga-activating-passive) 了解如何自动激活授予的技能）。

<!--en--> 
Designers can choose which abilities a `GameplayEffect` grants, what level to grant them at, what [input to bind](#concepts-ga-input) them at and the removal policy for the granted ability.
<!--/en--> 
设计师可以配置 `游戏效果` 可以授予哪些技能，技能的等级，以及输入的方式，以及所授予技能的移除策略。

| Removal Policy / 移除策略             | Description / 描述                                                                                                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cancel Ability Immediately<br>立刻移除 | The granted ability is canceled and removed immediately when the `GameplayEffect` that granted it is removed from the Target.<br>当授予该能力的 `游戏效果` 从目标身上移除时，授予的能力会被立即取消和移除。                                                   |
| Remove Ability on End<br>技能结束时移除      | The granted ability is allowed to finish and then is removed from the Target.<br>赋予的能力允许自然结束，然后从目标身上移除。                                                                                                   |
| Do Nothing<br>什么也不做                 | The granted ability is not affected by the removal of the granting `GameplayEffect` from the Target. The Target has the ability permanently until it is manually removed later. <br>当赋予该能力的`游戏效果`从目标身上移除时，所赋予的技能不受影响。目标将永久拥有该能力，直到被手动移除。|

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ge-tags"></a>
#### 4.5.7 游戏效果标签
<!--en--> 
`GameplayEffects` carry multiple [`GameplayTagContainers`](#concepts-gt). Designers will edit the `Added` and `Removed` `GameplayTagContainers` for each category and the result will show up in the `Combined` `GameplayTagContainer` on compilation. `Added` tags are new tags that this `GameplayEffect` adds that its parents did not previously have. `Removed` tags are tags that parent classes have but this subclass does not have.  
<!--/en--> 
`游戏效果` 有多个 [`GameplayTagContainer`](#concepts-gt). 设计者将为每个类别编辑 `Added` 和 `Removed` `GameplayTagContainer`，编译后的结果将显示在 `Combined` `GameplayTagContainer` 上。 `Added` 标签是这个 `GameplayEffect` 添加的新标签，而且其父类之前没有这些标签。 `Removed` 标签是父类具有但这个子类不具有的标签。


| 类别                          | 描述                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gameplay Effect Asset Tags<br>游戏效果资源标签        | Tags that the `GameplayEffect` has. They do not do any function on their own and serve only the purpose of describing the `GameplayEffect`.<br>`游戏效果`的标签。它们本身没有任何功能，只起到描述`游戏效果`的作用。                                                                                                                                                                                                                                        |
| Granted Tags<br>授予标签                      | Tags that live on the `GameplayEffect` but are also given to the `ASC` that the `GameplayEffect` is applied to. They are removed from the `ASC` when the `GameplayEffect` is removed. This only works for `Duration` and `Infinite` `GameplayEffects`.<br>存在于`游戏效果`上的标签，但也会被赋予应用了 `游戏效果`的`ASC`。当`游戏效果`被移除时，这些标签也会从`ASC`中移除。这只适用于 `持续` 和 `无限` `游戏效果`。                                                                                                                             |
| Ongoing Tag Requirements<br>持续要求标签          | Once applied, these tags determine whether the `GameplayEffect` is on or off. A `GameplayEffect` can be off and still be applied. If a `GameplayEffect` is off due to failing the Ongoing Tag Requirements, but the requirements are then met, the `GameplayEffect` will turn on again and reapply its modifiers. This only works for `Duration` and `Infinite` `GameplayEffects`. <br>一旦应用，这些标签将决定`游戏效果`是打开还是关闭。`游戏效果`可以是关闭的，但仍然可以应用。如果一个`游戏效果`由于未能满足持续标签要求而关闭，但随后又满足了要求，那么该`游戏效果`将再次开启并重新应用其修饰器。这只对`持续`和`无限`的`游戏效果`有效。|
| Application Tag Requirements<br>应用要求标签      | Tags on the Target that determine if a `GameplayEffect` can be applied to the Target. If these requirements are not met, the `GameplayEffect` is not applied.<br>目标上的 `标签` 决定`游戏效果`是否可以应用到目标上。如果不满足这些要求，`游戏效果`就不会应用。                                                                                                                                                                                                                      |
| Remove Gameplay Effects with Tags<br>使用标签删除游戏效果 | `GameplayEffects` on the Target that have any of these tags in their `Asset Tags` or `Granted Tags` will be removed from the Target when this `GameplayEffect` is successfully applied.  <br>当成功应用该`游戏效果`时，目标上的`资产标签`或`授予标签`中包含这些标签的`游戏效果`将从目标上移除                                                                                                                                            |

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ge-immunity"></a>
#### 4.5.8 免疫 / Immunity
<!--en--> 
`GameplayEffects` can grant immunity, effectively blocking the application of other `GameplayEffects`, based on [`GameplayTags`](#concepts-gt). While immunity can be effectively achieved through other means like `Application Tag Requirements`, using this system provides a delegate for when `GameplayEffects` are blocked due to immunity `UAbilitySystemComponent::OnImmunityBlockGameplayEffectDelegate`.  
<!--/en--> 
`游戏效果`可以带有免疫功能，从而有效地阻止其他`游戏效果`的应用，基于[`游戏标签`](#concepts-gt)。虽然免疫可以通过其他方式实现，比如通过`应用要求标签（Application Tag Requirements）`的方法，但免疫系统提供了一个委托，当游戏效果由于免疫被阻止时会触发`UAbilitySystemComponent::OnImmunityBlockGameplayEffectDelegate`。


<!--en--> 
`GrantedApplicationImmunityTags` checks if the Source `ASC` (including tags from the Source ability's `AbilityTags` if there was one) has any of the specified tags. This is a way to provide immunity from all `GameplayEffects` from certain characters or sources based on their tags.
<!--/en--> 
`GrantedApplicationImmunityTags`检查源`ASC`（包括源能力的`技能标签`，如果有的话）是否有指定的标签。这是一种提供免疫的方法，可以基于它们的标签从特定角色或源中免疫所有`游戏效果`。

<!--en--> 
`Granted Application Immunity Query` checks the incoming `GameplayEffectSpec` if it matches any of the queries to block or allow its application.  
<!--/en--> 
`Granted Application Immunity Query`检查传入的`GameplayEffectSpec`是否与阻止或允许其应用的任何查询匹配。

<!--en--> 
The queries have helpful hover tooltips in the `GameplayEffect` Blueprint.
<!--/en--> 
在`游戏效果`蓝图中，查询上会带有悬停提示。

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ge-spec"></a>
#### 4.5.9 游戏效果实例 / Gameplay Effect Spec
<!--en--> 
The [`GameplayEffectSpec`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/FGameplayEffectSpec/index.html) (`GESpec`) can be thought of as the instantiations of `GameplayEffects`. They hold a reference to the `GameplayEffect` class that they represent, what level it was created at, and who created it. These can be freely created and modified at runtime before application unlike `GameplayEffects` which should be created by designers prior to runtime. When applying a `GameplayEffect`, a `GameplayEffectSpec` is created from the `GameplayEffect` and that is actually what is applied to the Target.  
<!--/en--> 
[`GameplayEffectSpec`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/FGameplayEffectSpec/index.html)（`GESpec`）可以被认为是`游戏效果`的实例。它持有对表示它们的`游戏效果`类的引用，以及它被创建时的等级，以及谁创建了它。与设计师预先创建的`游戏效果`不同，`GESpec`可以在运行时自由创建和修改。当应用`游戏效果`时，会从`游戏效果`创建一个`GESpec`，实际上应用到目标上的是它而非`游戏效果`。

<!--en--> 
`GameplayEffectSpecs` are created from `GameplayEffects` using `UAbilitySystemComponent::MakeOutgoingSpec()` which is `BlueprintCallable`. `GameplayEffectSpecs` do not have to be immediately applied. It is common to pass a `GameplayEffectSpec` to a projectile created from an ability that the projectile can apply to the target it hits later. When `GameplayEffectSpecs` are successfully applied, they return a new struct called `FActiveGameplayEffect`.  
<!--/en--> 
`GameplayEffectSpec`是由`UAbilitySystemComponent::MakeOutgoingSpec()`创建的，该函数可以从蓝图调用。`GameplayEffectSpec`可能不会立即应用。一个很常见的手段是将`GameplayEffectSpec`传递给技能创建的子弹，并在稍后将其应用于击中的目标。当`GameplayEffectSpec`成功应用时，它们会返回一个新的结构体，称为`FActiveGameplayEffect`。

<!--en--> 
Notable `GameplayEffectSpec` Contents:
* The `GameplayEffect` class that this `GameplayEffect` was created from.
* The level of this `GameplayEffectSpec`. Usually the same as the level of the ability that created the `GameplayEffectSpec` but can be different.
* The duration of the `GameplayEffectSpec`. Defaults to the duration of the `GameplayEffect` but can be different.
* The period of the `GameplayEffectSpec` for periodic effects. Defaults to the period of the `GameplayEffect` but can be different.
* The current stack count of this `GameplayEffectSpec`. The stack limit is on the `GameplayEffect`.
* The [`GameplayEffectContextHandle`](#concepts-ge-context) tells us who created this `GameplayEffectSpec`.
* `Attributes` that were captured at the time of the `GameplayEffectSpec`'s creation due to snapshotting.
* `DynamicGrantedTags` that the `GameplayEffectSpec` grants to the Target in addition to the `GameplayTags` that the `GameplayEffect` grants.
* `DynamicAssetTags` that the `GameplayEffectSpec` has in addition to the `AssetTags` that the `GameplayEffect` has.
* `SetByCaller` `TMaps`.  
<!--/en--> 
值得注意的`GameplayEffectSpec`内容：
* 创建此`游戏效果`的`游戏效果`类。
* 这个`GameplayEffectSpec`的等级。通常与创建`GameplayEffectSpec`的技能的级别相同，但可以不同。
* 这个`GameplayEffectSpec`的持续时间。默认情况下与`游戏效果`的持续时间相同，但可以不同。
* 这个`GameplayEffectSpec`的周期，对于周期效果。默认情况下与`游戏效果`的周期相同，但可以不同。
* 这个`GameplayEffectSpec`的当前堆叠计数。堆叠限制在`游戏效果`上。
* [`GameplayEffectContextHandle`](#concepts-ge-context)会告诉我们谁创建了这个`GameplayEffectSpec`。
* 基于快照逻辑，在此`GameplayEffectSpec`创建时被捕获的`属性`。
* 除了`游戏效果`本身授予的`游戏标签`之外，此`GameplayEffectSpec`授予目标的`DynamicGrantedTag`。
* 除了`游戏效果`本身具有的`AssetTag`之外，此`GameplayEffectSpec`具有的`DynamicAssetTag`。
* `SetByCaller` `TMaps`。

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ge-spec-setbycaller"></a>
##### 4.5.9.1 SetByCaller
<!--en--> 
`SetByCallers` allow the `GameplayEffectSpec` to carry float values associated with a `GameplayTag` or `FName` around. They are stored in their respective `TMaps`: `TMap<FGameplayTag, float>` and `TMap<FName, float>` on the `GameplayEffectSpec`. These can be used as `Modifiers` on the `GameplayEffect` or as generic means of ferrying floats around. It is common to pass numerical data generated inside of an ability to [`GameplayEffectExecutionCalculations`](#concepts-ge-ec) or [`ModifierMagnitudeCalculations`](#concepts-ge-mmc) via `SetByCallers`.  
<!--/en--> 

`SetByCaller`允许`GameplayEffectSpec`携带与`GameplayTag`或`FName`相关的浮点值。它们存储在各自`GameplayEffectSpec`上的`TMaps`中：`TMap<FGameplayTag, float>`和`TMap<FName, float>`。它们可以被用作`游戏效果`上的`修改器`，或作为通用的传输浮点值的方式。一种常见的用法是在技能内部，通过`SetByCaller`将数值数据传递给[`GameplayEffectExecutionCalculation`](#concepts-ge-ec) 或 [`ModifierMagnitudeCalculation`](#concepts-ge-mmc)。

| `SetByCaller` 的 用法 | Notes / 要点                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Modifiers` / `修改器`      | Must be defined ahead of time in the `GameplayEffect` class. Can only use the `GameplayTag` version. If one is defined on the `GameplayEffect` class but the `GameplayEffectSpec` does not have the corresponding tag and float value pair, the game will have a runtime error on application of the `GameplayEffectSpec` and return 0. This is a potential problem for a `Divide` operation. See [`Modifiers`](#concepts-ge-mods).<br>必须在`游戏效果`类中提前定义。 只能使用`游戏标签`版本。 如果在`游戏效果`类中定义了一个`修改器`，但是`GameplayEffectSpec`没有相应的标签和浮点数值对，则游戏会在应用`GameplayEffectSpec`时产生一个运行时错误，然后返回0。对于`除法`操作来说，这是一个潜在的问题。 请参阅[`修改器`]（＃concepts-ge-mods）。 |
| Elsewhere / 其他        | Does not need to be defined ahead of time anywhere. Reading a `SetByCaller` that does not exist on a `GameplayEffectSpec` can return a developer defined default value with optional warnings.   <br>无需在任何地方提前定义。 读取一个在`GameplayEffectSpec`上不存在的`SetByCaller`会返回开发者预定义的默认值，并触发可选的警告。                                                                                                                                                                                                                                   |

<!--en--> 
To assign `SetByCaller` values in Blueprint, use the Blueprint node for the version that you need (`GameplayTag` or `FName`):
<!--/en--> 
在蓝图中指定`SetByCaller`值时，请使用您需要的版本的蓝图节点（`GameplayTag`或`FName`）：

![Assigning SetByCaller](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/setbycaller.png)

<!--en--> 
To read a `SetByCaller` value in Blueprint, you will need to make custom nodes in your Blueprint Library.
<!--/en--> 
在蓝图中读取`SetByCaller`值时，您需要在您的蓝图库中创建自定义节点。

<!--en--> 
To assign `SetByCaller` values in C++, use the version of the function that you need (`GameplayTag` or `FName`):
<!--/en--> 
在C++中指定`SetByCaller`值时，请使用您需要的版本的函数（`GameplayTag`或`FName`）：

```c++
void FGameplayEffectSpec::SetSetByCallerMagnitude(FName DataName, float Magnitude);
```
```c++
void FGameplayEffectSpec::SetSetByCallerMagnitude(FGameplayTag DataTag, float Magnitude);
```

<!--en--> 
To read a `SetByCaller` value in C++, use the version of the function that you need (`GameplayTag` or `FName`):
<!--/en--> 
在C++中读取`SetByCaller`值时，请使用您需要的版本的函数（`GameplayTag`或`FName`）：

```c++
float GetSetByCallerMagnitude(FName DataName, bool WarnIfNotFound = true, float DefaultIfNotFound = 0.f) const;
```
```c++
float GetSetByCallerMagnitude(FGameplayTag DataTag, bool WarnIfNotFound = true, float DefaultIfNotFound = 0.f) const;
```

<!--en--> 
I recommend using the `GameplayTag` version over the `FName` version. This can prevent spelling errors in Blueprint.
<!--/en--> 
我建议使用`GameplayTag`版本而不是`FName`版本。这可以在蓝图中防止拼写错误。

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ge-context"></a>
#### 4.5.10 游戏效果上下文 / Gameplay Effect Context
<!--en--> 
The [`GameplayEffectContext`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/FGameplayEffectContext/index.html) structure holds information about a `GameplayEffectSpec's` instigator and [`TargetData`](#concepts-targeting-data). This is also a good structure to subclass to pass arbitrary data around between places like [`ModifierMagnitudeCalculations`](#concepts-ge-mmc) / [`GameplayEffectExecutionCalculations`](#concepts-ge-ec), [`AttributeSets`](#concepts-as), and [`GameplayCues`](#concepts-gc).  
<!--/en--> 

[`GameplayEffectContext`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/FGameplayEffectContext/index.html)结构保存有关`GameplayEffectSpec`的发起者和[`TargetData`](#concepts-targeting-data)的信息。它也是一个很好的结构，可以将其子类化以在[`ModifierMagnitudeCalculation`](#concepts-ge-mmc) / [`GameplayEffectExecutionCalculation`](#concepts-ge-ec)、[`AttributeSet`](#concepts-as)和[`GameplayCue`](#concepts-gc)等地方传递任意数据。


<!--en--> 
To subclass the `GameplayEffectContext`:

1. Subclass `FGameplayEffectContext`
1. Override `FGameplayEffectContext::GetScriptStruct()`
1. Override `FGameplayEffectContext::Duplicate()`
1. Override `FGameplayEffectContext::NetSerialize()` if your new data needs to be replicated
1. Implement `TStructOpsTypeTraits` for your subclass, like the parent struct `FGameplayEffectContext` has
1. Override `AllocGameplayEffectContext()` in your [`AbilitySystemGlobals`](#concepts-asg) class to return a new object of your subclass
<!--/en--> 

要将其子类化：
1. 子类化`FGameplayEffectContext`
1. 重写`FGameplayEffectContext::GetScriptStruct()`
1. 重写`FGameplayEffectContext::Duplicate()`
1. 如果您的数据需要复制，则重写`FGameplayEffectContext::NetSerialize()`
1. 为您的子类实现`TStructOpsTypeTraits`，就像父结构`FGameplayEffectContext`所做的那样
1. 在您的[`AbilitySystemGlobals`](#concepts-asg)类中重写`AllocGameplayEffectContext()`以返回新对象类型的实例

<!--en--> 
[GASShooter](https://github.com/tranek/GASShooter) uses a subclassed `GameplayEffectContext` to add `TargetData` which can be accessed in `GameplayCues`, specifically for the shotgun since it can hit more than one enemy.
<!--/en--> 

[GASShooter](https://github.com/tranek/GASShooter) 使用一个子类化的`GameplayEffectContext`添加`TargetData`，它可以在`GameplayCue`中访问。特别是对于霰弹枪很有用，因为它可以击中多个敌人。

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ge-mmc"></a>
#### 4.5.11 修改器幅度计算
<!--en--> 
[`ModifierMagnitudeCalculations`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/UGameplayModMagnitudeCalculation/index.html) (`ModMagCalc` or `MMC`) are powerful classes used as [`Modifiers`](#concepts-ge-mods) in `GameplayEffects`. They function similarly to [`GameplayEffectExecutionCalculations`](#concepts-ge-ec) but are less powerful and most importantly they can be [predicted](#concepts-p). Their sole purpose is to return a float value from `CalculateBaseMagnitude_Implementation()`. You can subclass and override this function in Blueprint and C++.
<!--/en--> 

<!--cn-->
`ModifierMagnitudeCalculation` (`ModMagCalc` or `MMC`) 是强大的类，用于`游戏效果`中的[`修改器`](#concepts-ge-mods)。它们的功能类似于[`GameplayEffectExecutionCalculations`](#concepts-ge-ec)，但功能较弱，最重要的是它们可以[预测](#concepts-p)。它们的唯一目的是从`CalculateBaseMagnitude_Implementation()`返回一个浮点值。您可以在蓝图和C++中子类化和重写这个函数。
<!--/cn-->

<!--en--> 
`MMCs` can be used in any duration of `GameplayEffects` - `Instant`, `Duration`, `Infinite`, or `Periodic`.
<!--/en--> 

<!--cn-->
`MMC`可以在任何类型`游戏效果`起作用 - `立即`，`持续`，`无限`或`周期`。  
<!--/cn-->
  
<!--en--> 
`MMCs'` strength lies in their capability to capture the value of any number of `Attributes` on the `Source` or the `Target` of `GameplayEffect` with full access to the `GameplayEffectSpec` to read `GameplayTags` and `SetByCallers`. `Attributes` can either be snapshotted or not. Snapshotted `Attributes` are captured when the `GameplayEffectSpec` is created whereas non snapshotted `Attributes` are captured when the `GameplayEffectSpec` is applied and automatically update when the `Attribute` changes for `Infinite` and `Duration` `GameplayEffects`. Capturing `Attributes` recalculates their `CurrentValue` from existing mods on the `ASC`. This recalculation will **not** run [`PreAttributeChange()`](#concepts-as-preattributechange) in the `AbilitySet` so any clamping must be done here again.
<!--/en--> 

<!--cn-->  
`MMC`的强度依赖于它们捕获`游戏效果`在任何`属性`上的`源`或`目标`的值的能力，并且完全访问`游戏效果实例`以读取`游戏标签`和`SetByCaller`。`属性`可以快照或不快照。快照的`属性`是在`游戏效果实例`创建时被捕捉，而非快照的`属性`是在`游戏效果实例`应用时被捕捉，并且在`无限`和`持续``游戏效果`上，当`属性`改变时自动更新。捕捉`属性`会在现有的`ASC`上重新计算它们的`当前值`。这个重新计算将**不会**在`AbilitySet`中运行[`PreAttributeChange()`](#concepts-as-preattributechange)，所以如果任何限值必须在这里再做一次。
<!--/cn-->

| Snapshot / 快照 | Source or Target /源还是目标 | Captured on `GameplayEffectSpec` / 从`GEC`捕捉快照的时间| Automatically updates when `Attribute` changes for `Infinite` or `Duration` `GE` / 属性变化时自动更新|
| -------- | ---------------- | -------------------------------- | -------------------------------------------------------------------------------- |
| Yes      | Source           | Creation                         | No                                                                               |
| Yes      | Target           | Application                      | No                                                                               |
| No       | Source           | Application                      | Yes                                                                              |
| No       | Target           | Application                      | Yes                                                                              |

<!--en--> 
The resultant float from an `MMC` can further be modified in the `GameplayEffect's` `Modifier` by a coefficient and a pre and post coefficient addition.
<!--/en--> 

<!--cn-->
`MMC`的结果可以进一步通过系数和预加系数和后加系数修改`游戏效果`的`修改器`。
<!--/cn-->

<!--en--> 
An example `MMC` that captures the `Target's` mana `Attribute` reduces it from a poison effect where the amount reduced changes depending on how much mana the `Target` has and a tag that the `Target` might have:
<!--/en--> 

<!--cn-->
以下是一个示例`MMC`，它捕捉`目标`的法力`属性`，造成一种法力流失的中毒效果，减少的量取决于`目标`的`法力`有多少，以及`目标`可能拥有的标签：
<!--/cn-->

```c++
UPAMMC_PoisonMana::UPAMMC_PoisonMana()
{

	//ManaDef defined in header FGameplayEffectAttributeCaptureDefinition ManaDef;
	ManaDef.AttributeToCapture = UPAAttributeSetBase::GetManaAttribute();
	ManaDef.AttributeSource = EGameplayEffectAttributeCaptureSource::Target;
	ManaDef.bSnapshot = false;

	//MaxManaDef defined in header FGameplayEffectAttributeCaptureDefinition MaxManaDef;
	MaxManaDef.AttributeToCapture = UPAAttributeSetBase::GetMaxManaAttribute();
	MaxManaDef.AttributeSource = EGameplayEffectAttributeCaptureSource::Target;
	MaxManaDef.bSnapshot = false;

	RelevantAttributesToCapture.Add(ManaDef);
	RelevantAttributesToCapture.Add(MaxManaDef);
}

float UPAMMC_PoisonMana::CalculateBaseMagnitude_Implementation(const FGameplayEffectSpec & Spec) const
{
	// Gather the tags from the source and target as that can affect which buffs should be used
	const FGameplayTagContainer* SourceTags = Spec.CapturedSourceTags.GetAggregatedTags();
	const FGameplayTagContainer* TargetTags = Spec.CapturedTargetTags.GetAggregatedTags();

	FAggregatorEvaluateParameters EvaluationParameters;
	EvaluationParameters.SourceTags = SourceTags;
	EvaluationParameters.TargetTags = TargetTags;

	float Mana = 0.f;
	GetCapturedAttributeMagnitude(ManaDef, Spec, EvaluationParameters, Mana);
	Mana = FMath::Max<float>(Mana, 0.0f);

	float MaxMana = 0.f;
	GetCapturedAttributeMagnitude(MaxManaDef, Spec, EvaluationParameters, MaxMana);
	MaxMana = FMath::Max<float>(MaxMana, 1.0f); // Avoid divide by zero

	float Reduction = -20.0f;
	if (Mana / MaxMana > 0.5f)
	{
		// Double the effect if the target has more than half their mana
		Reduction *= 2;
	}
	
	if (TargetTags->HasTagExact(FGameplayTag::RequestGameplayTag(FName("Status.WeakToPoisonMana"))))
	{
		// Double the effect if the target is weak to PoisonMana
		Reduction *= 2;
	}
	
	return Reduction;
}
```

<!--en--> 
If you don't add the `FGameplayEffectAttributeCaptureDefinition` to `RelevantAttributesToCapture` in the `MMC's` constructor and try to capture `Attributes`, you will get an error about a missing Spec while capturing. If you don't need to capture `Attributes`, then you don't have to add anything to `RelevantAttributesToCapture`.
<!--/en--> 

<!--cn-->
如果尝试捕获`属性`之前，你没有将`FGameplayEffectAttributeCaptureDefinition`添加到`MMC`的构造函数中的`RelevantAttributesToCapture`，会得到一个关于捕获实例的错误。如果你不需要捕获`属性`，那么你就不需要添加任何东西到`RelevantAttributesToCapture`。
<!--/cn-->

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ge-ec"></a>
#### 4.5.12 Gameplay Effect Execution Calculation
<!--en--> 
[`GameplayEffectExecutionCalculations`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/UGameplayEffectExecutionCalculat-/index.html) (`ExecutionCalculation`, `Execution` (you will often see this term in the plugin's source code), or `ExecCalc`) are the most powerful way for `GameplayEffects` to make changes to an `ASC`. Like [`ModifierMagnitudeCalculations`](#concepts-ge-mmc), these can capture `Attributes` and optionally snapshot them. Unlike `MMCs`, these can change more than one `Attribute` and essentially do anything else that the programmer wants. The downside to this power and flexibility is that they can not be [predicted](#concepts-p) and they must be implemented in C++.
<!--/en--> 

<!--cn-->
[`GameplayEffectExecutionCalculation`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/UGameplayEffectExecutionCalculat-/index.html)(`ExecutionCalculation`, `Execution`（您通常会在插件的源代码中看到此术语）, 或者 `ExecCalc`)是`游戏效果`修改`ASC`最强大的方式。像[`ModifierMagnitudeCalculation`](#concepts-ge-mmc)一样，这些可以捕捉`属性`并可以选择对它们快照。与`MMC`不同的是，它可以改变不止一个`属性`，本质上来说可以做任何程序员想要的事情。这种灵活而强大的代价是它们不能被[预测](#concepts-p)，并且必须在C++中实现。
<!--/cn-->

<!--en--> 
`ExecutionCalculations` can only be used with `Instant` and `Periodic` `GameplayEffects`. Anything with the word 'Execute' in it typically refers to these two types of `GameplayEffects`.
<!--/en--> 

<!--cn-->
`ExecutionCalculation`只能与`即时`和`周期`型 `游戏效果`一起使用。任何包含“Execute”一词的通常指的是这两种类型的`游戏效果`。
<!--/cn-->

<!--en--> 
Snapshotting captures the `Attribute` when the `GameplayEffectSpec` is created whereas not snapshotting captures the `Attribute` when the `GameplayEffectSpec` is applied. Capturing `Attributes` recalculates their `CurrentValue` from existing mods on the `ASC`. This recalculation will **not** run [`PreAttributeChange()`](#concepts-as-preattributechange) in the `AbilitySet` so any clamping must be done here again.
<!--/en--> 

<!--cn-->
`GameplayEffectSpec`创建时快照会捕获`属性`，而应用时不会捕获。捕获`属性`会根据现有的`ASC`重新计算它们的`当前值`。这个重新计算**不会**在`AbilitySet`中触发[`PreAttributeChange()`](#concepts-as-preattributechange)，所以任何限制必须在这里再次完成。
<!--/cn-->

| Snapshot | Source or Target | Captured on `GameplayEffectSpec` |
| -------- | ---------------- | -------------------------------- |
| Yes      | Source           | Creation                         |
| Yes      | Target           | Application                      |
| No       | Source           | Application                      |
| No       | Target           | Application                      |

<!--en--> 
To set up `Attribute` capture, we follow a pattern set by Epic's ActionRPG Sample Project by defining a struct holding and defining how we capture the `Attributes` and creating one copy of it in the struct's constructor. You will have a struct like this for every `ExecCalc`. **Note:** Each struct needs a unique name as they share the same namespace. Using the same name for the structs will cause incorrect behavior in capturing your `Attributes` (mostly capturing the values of the wrong `Attributes`).
<!--/en--> 

<!--cn-->
为了捕获`属性`，我们遵循 Epic 的 ActionRPG 示例项目的设置模式，定义一个结构体持有并定义如何捕获`属性`，并在这个结构的构造函数中创建一个副本。对于每个`ExecCalc`，设置一个这样的结构体，**注意：**每个结构体需要一个唯一的名称，因为它们共享相同的命名空间。结构体重名将导致捕获`属性`过程中发生行为错误（主要是捕获了错误的`属性`值）。
<!--/cn-->

<!--en--> 
For `Local Predicted`, `Server Only`, and `Server Initiated` [`GameplayAbilities`](#concepts-ga), the `ExecCalc` only calls on the Server.
<!--/en--> 

<!--cn-->
对于`Local Predicted`、`Server Only`和`Server Initiated` 的[`技能`](#concepts-ga)，`ExecCalc`只会在服务器上调用。
<!--/cn-->

<!--en--> 
Calculating damage received based on a complex formula reading from many attributes on the `Source` and the `Target` is the most common example of an `ExecCalc`. The included Sample Project has a simple `ExecCalc` for calculating damage that reads the value of damage from the `GameplayEffectSpec's` [`SetByCaller`](#concepts-ge-spec-setbycaller) and then mitigates that value based on the armor `Attribute` captured from the `Target`. See `GDDamageExecCalculation.cpp/.h`.
<!--/en--> 

<!--cn-->
`ExecCalc`最常见的的例子是，从`源`和`目标`上读取许多`属性`，以复杂公式计算受到的伤害。包含的示例项目中有一个简单的`ExecCalc`，用于计算从`GameplayEffectSpec`的[`SetByCaller`](#concepts-ge-spec-setbycaller)读取伤害值，然后根据从`目标`捕获的`属性`减去该值。请参阅`GDDamageExecCalculation.cpp/.h`。
<!--/cn-->

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ge-ec-senddata"></a>
##### 4.5.12.1 向`ExecutionCalculation`发送数据
<!--en--> 
There are a few ways to send data to an `ExecutionCalculation` in addition to capturing `Attributes`.
<!--/en--> 

<!--cn-->
除了捕获`属性`之外，还有几种方法可以向`ExecutionCalculation`发送数据。
<!--/cn-->

<a name="concepts-ge-ec-senddata-setbycaller"></a>
###### 4.5.12.1.1 SetByCaller
Any [`SetByCallers` set on the `GameplayEffectSpec`](#concepts-ge-spec-setbycaller) can be directly read in the `ExecutionCalculation`.

<!--cn-->
任何[`SetByCaller`](#concepts-ge-spec-setbycaller)都可以直接在`ExecutionCalculation`中读取。
<!--/cn-->

```c++
const FGameplayEffectSpec& Spec = ExecutionParams.GetOwningSpec();
float Damage = FMath::Max<float>(Spec.GetSetByCallerMagnitude(FGameplayTag::RequestGameplayTag(FName("Data.Damage")), false, -1.0f), 0.0f);
```

<a name="concepts-ge-ec-senddata-backingdataattribute"></a>
<!--en--> 
###### 4.5.12.1.2 Backing Data Attribute Calculation Modifier
<!--/en--> 
###### 4.5.12.1.2 后备数据属性计算修改器
<!--en--> 
If you want to hardcode values to a `GameplayEffect`, you can pass them in using a `CalculationModifier` that uses one of the captured `Attributes` as the backing data.
<!--/en--> 

<!--cn-->
如果你想让一个`游戏效果`使用硬编码值，你可以使用一个以捕获的`属性`作为后备数据的`CalculationModifier`。
<!--/cn-->

<!--en--> 
In this screenshot example, we're adding 50 to the captured Damage `Attribute`. You could also set this to `Override` to just take in only the hardcoded value.
<!--/en--> 
<!--cn-->
在下面的截图例子中，我们给捕获的Damage`属性`加50。你也可以设置这个为`Override`，只接受硬编码值。
<!--/cn-->

![Backing Data Attribute Calculation Modifier](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/calculationmodifierbackingdataattribute.png)

<!--en--> 
The `ExecutionCalculation` reads this value in when it captures the `Attribute`.
<!--/en--> 
<!--cn-->
`ExecutionCalculation`在捕获`属性`时读取这个值。
<!--/cn-->

```c++
float Damage = 0.0f;
// Capture optional damage value set on the damage GE as a CalculationModifier under the ExecutionCalculation
ExecutionParams.AttemptCalculateCapturedAttributeMagnitude(DamageStatics().DamageDef, EvaluationParameters, Damage);
```

<a name="concepts-ge-ec-senddata-backingdatatempvariable"></a>
###### 4.5.12.1.3 Backing Data Temporary Variable Calculation Modifier
<!--en-->
If you want to hardcode values to a `GameplayEffect`, you can pass them in using a `CalculationModifier` that uses a `Temporary Variable` or `Transient Aggregator` as it's called in C++. The `Temporary Variable` is associated with a `GameplayTag`.
<!--/en-->  

<!--cn-->
如果你想要硬编码值给一个`游戏效果`，你可以使用一个`CalculationModifier`，它在C++中被调用时，使用一个`Temporary Variable`或者`Transient Aggregator`作为它的参数。`Temporary Variable`与一个`GameplayTag`相关联。
<!--/cn-->

<!--en-->
In this screenshot example, we're adding 50 to a `Temporary Variable` using the `Data.Damage` `GameplayTag`.
<!--/en-->
<!--cn-->
在下面的截图例子中，我们使用`Data.Damage` `GameplayTag`给一个`Temporary Variable`加上50。
<!--/cn-->

![Backing Data Temporary Variable Calculation Modifier](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/calculationmodifierbackingdatatempvariable.png)
<!--en-->
Add backing `Temporary Variables` to your `ExecutionCalculation`'s constructor:
<!--/en-->
<!--cn-->
在`ExecutionCalculation`的构造函数里添加`Temporary Variables`：
<!--/cn-->

```c++
ValidTransientAggregatorIdentifiers.AddTag(FGameplayTag::RequestGameplayTag("Data.Damage"));
```

The `ExecutionCalculation` reads this value in using special capture functions similar to the `Attribute` capture functions.
<!--cn-->
`ExecutionCalculation`使用特殊的捕获函数读取这个值，类似于`属性`捕获函数。
<!--/cn-->

```c++
float Damage = 0.0f;
ExecutionParams.AttemptCalculateTransientAggregatorMagnitude(FGameplayTag::RequestGameplayTag("Data.Damage"), EvaluationParameters, Damage);
```

<a name="concepts-ge-ec-senddata-effectcontext"></a>
###### 4.5.12.1.4 游戏效果上下文 / Gameplay Effect Context
<!--en-->
You can send data to the `ExecutionCalculation` via a custom [`GameplayEffectContext` on the `GameplayEffectSpec`](#concepts-ge-context).
<!--/en-->

<!--cn-->
可以通过[`GameplayEffectSpec`上的自定义`GameplayEffectContext`](#concepts-ge-context)发送数据到`ExecutionCalculation`。
<!--/cn-->

<!--en-->
In the `ExecutionCalculation` you can access the `EffectContext` from the `FGameplayEffectCustomExecutionParameters`.
<!--en-->

<!--cn-->
在`ExecutionCalculation`中，你可以从`FGameplayEffectCustomExecutionParameters`访问`EffectContext`。
<!--/cn-->

```c++
const FGameplayEffectSpec& Spec = ExecutionParams.GetOwningSpec();
FGSGameplayEffectContext* ContextHandle = static_cast<FGSGameplayEffectContext*>(Spec.GetContext().Get());
```

<!--en-->
If you need change something on the `GameplayEffectSpec` or the `EffectContext`:
<!--/en-->

<!--cn-->
如果需要修改`GameplayEffectSpec`或`EffectContext`：
<!--/cn-->

```c++
FGameplayEffectSpec* MutableSpec = ExecutionParams.GetOwningSpecForPreExecuteMod();
FGSGameplayEffectContext* ContextHandle = static_cast<FGSGameplayEffectContext*>(MutableSpec->GetContext().Get());
```

<!--en-->
Use caution if modifying the `GameplayEffectSpec` in the `ExecutionCalculation`. See the comment for `GetOwningSpecForPreExecuteMod()`.
<!--/en-->

<!--cn-->
在`ExecutionCalculation`中修改`GameplayEffectSpec`时要小心。请参阅`GetOwningSpecForPreExecuteMod()`的注释。
<!--/cn-->


```c++
/** Non const access. Be careful with this, especially when modifying a spec after attribute capture. */
FGameplayEffectSpec* GetOwningSpecForPreExecuteMod() const;
```

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ge-car"></a>
#### 4.5.13 自定义应用要求
<!--en-->
[`CustomApplicationRequirement`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/UGameplayEffectCustomApplication-/index.html) (`CAR`) classes give the designers advanced control over whether a `GameplayEffect` can be applied versus the simple `GameplayTag` checks on the `GameplayEffect`. These can be implemented in Blueprint by overriding `CanApplyGameplayEffect()` and in C++ by overriding `CanApplyGameplayEffect_Implementation()`.
<!--en-->

<!--cn-->
[`CustomApplicationRequirement`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/UGameplayEffectCustomApplication-/index.html) (`CAR`) 类允许设计师对 `GameplayEffect` 能否被应用进行高级控制。这些可以在蓝图中通过重写 `CanApplyGameplayEffect()` 实现，也可以在 C++ 中通过重写 `CanApplyGameplayEffect_Implementation()` 实现。
<!--/cn-->

<!--en-->
Examples of when to use `CARs`:
* `Target` needs to have a certain amount of an `Attribute`
* `Target` needs to have a certain number of stacks of a `GameplayEffect`
<!--/en-->

<!--cn-->
使用 `CAR` 的例子：
* `目标` 需要某`属性`达到一定值
* `目标` 需要某`游戏效果`的堆叠数达到一定值
<!--/cn-->

<!--en-->
`CARs` can also do more advanced things like checking if an instance of this `GameplayEffect` is already on the `Target` and [changing the duration](#concepts-ge-duration) of the existing instance instead of applying a new instance (return false for `CanApplyGameplayEffect()`).
<!--/en-->
<!--cn-->
`CAR`也能做更高级的事情，比如检查`目标`上是否已经存在该`游戏效果`的实例，如果存在则修改该实例的持续时间而不应用新的实例（在`CanApplyGameplayEffect()`中返回false）。
<!--/cn-->

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ge-cost"></a>
#### 4.5.14 消耗性技能效果 / Cost Gameplay Effect
<!--en-->
[`GameplayAbilities`](#concepts-ga) have an optional `GameplayEffect` specifically designed to use as the cost of the ability. Costs are how much of an `Attribute` an `ASC` needs to have to be able to activate the `GameplayAbility`. If a `GA` cannot afford the `Cost GE`, then they will not be able to activate. This `Cost GE` should be an `Instant` `GameplayEffect` with one or more `Modifiers` that subtract from `Attributes`. By default, `Cost GEs` are meant to be predicted and it is recommended to maintain that capability meaning do not use `ExecutionCalculations`. `MMCs` are perfectly acceptable and encouraged for complex cost calculations.
<!--/en-->

<!--cn-->
[`游戏技能`](#concepts-ga)有可选的`游戏效果`，专门用于技能的消耗。消耗的含义是`ASC`需要`属性`值达到多少才能激活`游戏技能`。如果`GA`无法负担`消耗性GE`的消耗，那么就无法激活。这个`消耗性GE`应该是一个`即时`的`游戏效果`，带有一个或多个`修改器`，用来从`属性`中减掉值。默认情况下，`消耗性GE`应该可以被预测，建议保持这种能力，这也就意味着尽量不要使用`ExecutionCalculation`。`MMC`完美符合要求，所以建议将其用于计算较复杂的消耗。
<!--/cn-->

<!--en-->
When starting out, you will most likely have one unique `Cost GE` per `GA` that has a cost. A more advanced technique is to reuse one `Cost GE` for multiple `GAs` and just modify the `GameplayEffectSpec` created from the `Cost GE` with the `GA`-specific data (the cost value is defined on the `GA`). **This only works for `Instanced` abilities.**
<!--/en-->
<!--cn-->
刚开始的时候，你可能会为每个`技能`创建一个唯一的`消耗性GE`。更高级的技巧是，复用一个`消耗性GE`来为多个`技能`服务，并使用`技能`特定的数据来修改`消耗性GE`创建的`GameplayEffectSpec`（消耗值是在`技能`上定义的）。**这个方法只适用于`实例化`的技能。**
<!--/cn-->

<!--en-->
Two techniques for reusing the `Cost GE`:
<!--/en-->

<!--cn-->
复用`消耗性GE`的两种方法：
<!--/cn-->

<!--en-->
1. **Use an `MMC`.** This is the easiest method. Create an [`MMC`](#concepts-ge-mmc) that reads the cost value from the `GameplayAbility` instance which you can get from the `GameplayEffectSpec`.
<!--/en-->

<!--cn-->
1. **使用`MMC`。**这是最简单的方法。创建一个[`MMC`](#concepts-ge-mmc)，从`GameplayEffectSpec`中获取`游戏技能`的实例，再从技能实例获取消耗值。
<!--/cn-->

```c++
float UPGMMC_HeroAbilityCost::CalculateBaseMagnitude_Implementation(const FGameplayEffectSpec & Spec) const
{
	const UPGGameplayAbility* Ability = Cast<UPGGameplayAbility>(Spec.GetContext().GetAbilityInstance_NotReplicated());

	if (!Ability)
	{
		return 0.0f;
	}

	return Ability->Cost.GetValueAtLevel(Ability->GetAbilityLevel());
}
```

<!--en-->
In this example the cost value is an `FScalableFloat` on the `GameplayAbility` child class that I added to it.
<!--/en-->

<!--cn-->
在这个例子中，消耗值是一个`FScalableFloat`，它被添加到`GameplayAbility`的子类中。
<!--/cn-->

```c++
UPROPERTY(BlueprintReadOnly, EditAnywhere, Category = "Cost")
FScalableFloat Cost;
```

![Cost GE With MMC](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/costmmc.png)

2. **Override `UGameplayAbility::GetCostGameplayEffect()`.** Override this function and [create a `GameplayEffect` at runtime](#concepts-ge-dynamic) that reads the cost value on the `GameplayAbility`.
<!--cn-->
2. **重写`UGameplayAbility::GetCostGameplayEffect()`。** 重写这个函数，并在运行时创建一个消耗性的[`GameplayEffect`](#concepts-ge)，它读取`GameplayAbility`上的消耗值。
<!--/cn-->

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ge-cooldown"></a>
#### 4.5.15 冷却性游戏效果
[`GameplayAbilities`](#concepts-ga) have an optional `GameplayEffect` specifically designed to use as the cooldown of the ability. Cooldowns determine how long after activation the ability can be activated again. If a `GA` is still on cooldown, it cannot activate. This `Cooldown GE` should be a `Duration` `GameplayEffect` with no `Modifiers` and a unique `GameplayTag` per `GameplayAbility` or per ability slot (if your game has interchangeable abilities assigned to slots that share a cooldown) in the `GameplayEffect's` `GrantedTags` ("`Cooldown Tag`"). The `GA` actually checks for the presence of the `Cooldown Tag` instead of the presence of the `Cooldown GE`. By default, `Cooldown GEs` are meant to be predicted and it is recommended to maintain that capability meaning do not use `ExecutionCalculations`. `MMCs` are perfectly acceptable and encouraged for complex cooldown calculations.

<!--cn-->
[`游戏技能`](#concepts-ga) 有一个可选的 `游戏效果`，专门用于作为技能的冷却。 冷却确定在激活后该技能可以再次激活的间隔时间。 如果一个`游戏技能`仍在冷却中，它就不能激活。 这个`冷却性游戏效果`应该是一个没有 `修改器` 的 `持续性` `游戏效果`，每个 `游戏技能` 或每个技能槽（如果你的游戏有共享冷却的互换技能分配给槽位）在 `游戏效果` 的 `GrantedTag` 中有一个唯一的 `游戏标签`（“`Cooldown 标签`”）。 `GA` 实际上检查的是 `Cooldown 标签` 而不是 `冷却性游戏效果` 。 默认情况下，`冷却性游戏效果`应该可以被预测，建议保持这种能力，这也就意味着尽量不要使用`ExecutionCalculation`。`MMC`完美符合要求，所以建议将其用于计算较复杂的冷却。
<!--/cn-->

When starting out, you will most likely have one unique `Cooldown GE` per `GA` that has a cooldown. A more advanced technique is to reuse one `Cooldown GE` for multiple `GAs` and just modify the `GameplayEffectSpec` created from the `Cooldown GE` with the `GA`-specific data (the cooldown duration and the `Cooldown Tag` are defined on the `GA`). **This only works for `Instanced` abilities.**
<!--cn-->
刚开始的时候，你可能会为每个`技能`创建一个唯一的`冷却性游戏效果`。更高级的技巧是，复用一个`冷却性游戏效果`来为多个`技能`服务，并使用`技能`特定的数据来修改`冷却性游戏效果`创建的`GameplayEffectSpec`（冷却时间是在`技能`上定义的）。**这个方法只适用于`实例化`的技能。**
<!--/cn-->

Two techniques for reusing the `Cooldown GE`:
<!--cn-->
复用`冷却性游戏效果`的两种方法：
<!--/cn-->

1. **Use a [`SetByCaller`](#concepts-ge-spec-setbycaller).** This is the easiest method. Set the duration of your shared `Cooldown GE` to `SetByCaller` with a `GameplayTag`. On your `GameplayAbility` subclass, define a float / `FScalableFloat` for the duration, a `FGameplayTagContainer` for the unique `Cooldown Tag`, and a temporary `FGameplayTagContainer` that we will use as the return pointer of the union of our `Cooldown Tag` and the `Cooldown GE's` tags.
<!--cn-->
1. **使用[`SetByCaller`](#concepts-ge-spec-setbycaller)。** 这是最简单的方法。将共享的`冷却性游戏效果`的持续时间设置到带有`标签`的`SetByCaller`。在你的`游戏技能`的子类中，定义一个用于持续时间的浮点数/`FScalableFloat`，一个用于唯一`冷却标签`的`FGameplayTagContainer`，以及一个临时的`FGameplayTagContainer`，它将作为`冷却标签`和`冷却性游戏效果`的标签的并集的返回指针。
<!--/cn-->

```c++
UPROPERTY(BlueprintReadOnly, EditAnywhere, Category = "Cooldown")
FScalableFloat CooldownDuration;

UPROPERTY(BlueprintReadOnly, EditAnywhere, Category = "Cooldown")
FGameplayTagContainer CooldownTags;

// Temp container that we will return the pointer to in GetCooldownTags().
// This will be a union of our CooldownTags and the Cooldown GE's cooldown tags.
UPROPERTY(Transient)
FGameplayTagContainer TempCooldownTags;
```

Then override `UGameplayAbility::GetCooldownTags()` to return the union of our `Cooldown Tags` and any existing `Cooldown GE's` tags.
```c++
const FGameplayTagContainer * UPGGameplayAbility::GetCooldownTags() const
{
	FGameplayTagContainer* MutableTags = const_cast<FGameplayTagContainer*>(&TempCooldownTags);
	MutableTags->Reset(); // MutableTags writes to the TempCooldownTags on the CDO so clear it in case the ability cooldown tags change (moved to a different slot)
	const FGameplayTagContainer* ParentTags = Super::GetCooldownTags();
	if (ParentTags)
	{
		MutableTags->AppendTags(*ParentTags);
	}
	MutableTags->AppendTags(CooldownTags);
	return MutableTags;
}
```

Finally, override `UGameplayAbility::ApplyCooldown()` to inject our `Cooldown Tags` and to add the `SetByCaller` to the cooldown `GameplayEffectSpec`.
```c++
void UPGGameplayAbility::ApplyCooldown(const FGameplayAbilitySpecHandle Handle, const FGameplayAbilityActorInfo * ActorInfo, const FGameplayAbilityActivationInfo ActivationInfo) const
{
	UGameplayEffect* CooldownGE = GetCooldownGameplayEffect();
	if (CooldownGE)
	{
		FGameplayEffectSpecHandle SpecHandle = MakeOutgoingGameplayEffectSpec(CooldownGE->GetClass(), GetAbilityLevel());
		SpecHandle.Data.Get()->DynamicGrantedTags.AppendTags(CooldownTags);
		SpecHandle.Data.Get()->SetSetByCallerMagnitude(FGameplayTag::RequestGameplayTag(FName(  OurSetByCallerTag  )), CooldownDuration.GetValueAtLevel(GetAbilityLevel()));
		ApplyGameplayEffectSpecToOwner(Handle, ActorInfo, ActivationInfo, SpecHandle);
	}
}
```

In this picture, the cooldown's duration `Modifier` is set to `SetByCaller` with a `Data Tag` of `Data.Cooldown`. `Data.Cooldown` would be `OurSetByCallerTag` in the code above.

![Cooldown GE with SetByCaller](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/cooldownsbc.png)

2. **Use an [`MMC`](#concepts-ge-mmc).** This has the same setup as above except for setting the `SetByCaller` as the duration on the `Cooldown GE` and in `ApplyCooldown`. Instead, set the duration to be a `Custom Calculation Class` and point to the new `MMC` that we will make.
```c++
UPROPERTY(BlueprintReadOnly, EditAnywhere, Category = "Cooldown")
FScalableFloat CooldownDuration;

UPROPERTY(BlueprintReadOnly, EditAnywhere, Category = "Cooldown")
FGameplayTagContainer CooldownTags;

// Temp container that we will return the pointer to in GetCooldownTags().
// This will be a union of our CooldownTags and the Cooldown GE's cooldown tags.
UPROPERTY(Transient)
FGameplayTagContainer TempCooldownTags;
```

Then override `UGameplayAbility::GetCooldownTags()` to return the union of our `Cooldown Tags` and any existing `Cooldown GE's` tags.
```c++
const FGameplayTagContainer * UPGGameplayAbility::GetCooldownTags() const
{
	FGameplayTagContainer* MutableTags = const_cast<FGameplayTagContainer*>(&TempCooldownTags);
	MutableTags->Reset(); // MutableTags writes to the TempCooldownTags on the CDO so clear it in case the ability cooldown tags change (moved to a different slot)
	const FGameplayTagContainer* ParentTags = Super::GetCooldownTags();
	if (ParentTags)
	{
		MutableTags->AppendTags(*ParentTags);
	}
	MutableTags->AppendTags(CooldownTags);
	return MutableTags;
}
```

Finally, override `UGameplayAbility::ApplyCooldown()` to inject our `Cooldown Tags` into the cooldown `GameplayEffectSpec`.
```c++
void UPGGameplayAbility::ApplyCooldown(const FGameplayAbilitySpecHandle Handle, const FGameplayAbilityActorInfo * ActorInfo, const FGameplayAbilityActivationInfo ActivationInfo) const
{
	UGameplayEffect* CooldownGE = GetCooldownGameplayEffect();
	if (CooldownGE)
	{
		FGameplayEffectSpecHandle SpecHandle = MakeOutgoingGameplayEffectSpec(CooldownGE->GetClass(), GetAbilityLevel());
		SpecHandle.Data.Get()->DynamicGrantedTags.AppendTags(CooldownTags);
		ApplyGameplayEffectSpecToOwner(Handle, ActorInfo, ActivationInfo, SpecHandle);
	}
}
```

```c++
float UPGMMC_HeroAbilityCooldown::CalculateBaseMagnitude_Implementation(const FGameplayEffectSpec & Spec) const
{
	const UPGGameplayAbility* Ability = Cast<UPGGameplayAbility>(Spec.GetContext().GetAbilityInstance_NotReplicated());

	if (!Ability)
	{
		return 0.0f;
	}

	return Ability->CooldownDuration.GetValueAtLevel(Ability->GetAbilityLevel());
}
```

![Cooldown GE with MMC](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/cooldownmmc.png)

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ge-cooldown-tr"></a>
##### 4.5.15.1 Get the Cooldown Gameplay Effect's Remaining Time
```c++
bool APGPlayerState::GetCooldownRemainingForTag(FGameplayTagContainer CooldownTags, float & TimeRemaining, float & CooldownDuration)
{
	if (AbilitySystemComponent && CooldownTags.Num() > 0)
	{
		TimeRemaining = 0.f;
		CooldownDuration = 0.f;

		FGameplayEffectQuery const Query = FGameplayEffectQuery::MakeQuery_MatchAnyOwningTags(CooldownTags);
		TArray< TPair<float, float> > DurationAndTimeRemaining = AbilitySystemComponent->GetActiveEffectsTimeRemainingAndDuration(Query);
		if (DurationAndTimeRemaining.Num() > 0)
		{
			int32 BestIdx = 0;
			float LongestTime = DurationAndTimeRemaining[0].Key;
			for (int32 Idx = 1; Idx < DurationAndTimeRemaining.Num(); ++Idx)
			{
				if (DurationAndTimeRemaining[Idx].Key > LongestTime)
				{
					LongestTime = DurationAndTimeRemaining[Idx].Key;
					BestIdx = Idx;
				}
			}

			TimeRemaining = DurationAndTimeRemaining[BestIdx].Key;
			CooldownDuration = DurationAndTimeRemaining[BestIdx].Value;

			return true;
		}
	}

	return false;
}
```

**Note:** Querying the cooldown's time remaining on clients requires that they can receive replicated `GameplayEffects`. This will depend on their `ASC's` [replication mode](#concepts-asc-rm).

<a name="concepts-ge-cooldown-listen"></a>
##### 4.5.15.2 Listening for Cooldown Begin and End
To listen for when a cooldown begins, you can either respond to when the `Cooldown GE` is applied by binding to `AbilitySystemComponent->OnActiveGameplayEffectAddedDelegateToSelf` or when the `Cooldown Tag` is added by binding to `AbilitySystemComponent->RegisterGameplayTagEvent(CooldownTag, EGameplayTagEventType::NewOrRemoved)`. I recommend listening for when the `Cooldown GE` is added because you also have access to the `GameplayEffectSpec` that applied it. From this you can determine if the `Cooldown GE` is the locally predicted one or the Server's correcting one.

To listen for when a cooldown ends, you can either respond to when the `Cooldown GE` is removed by binding to `AbilitySystemComponent->OnAnyGameplayEffectRemovedDelegate()` or when the `Cooldown Tag` is removed by binding to `AbilitySystemComponent->RegisterGameplayTagEvent(CooldownTag, EGameplayTagEventType::NewOrRemoved)`. I recommend listening for when the `Cooldown Tag` is removed because when the Server's corrected `Cooldown GE` comes in, it will remove our locally predicted one causing the `OnAnyGameplayEffectRemovedDelegate()` to fire even though we're still on cooldown. The `Cooldown Tag` will not change during the removal of the predicted `Cooldown GE` and the application of the Server's corrected `Cooldown GE`.

**Note:** Listening for a `GameplayEffect` to be added or removed on clients requires that they can receive replicated `GameplayEffects`. This will depend on their `ASC's` [replication mode](#concepts-asc-rm).

The Sample Project includes a custom Blueprint node that listens for cooldowns beginning and ending. The HUD UMG Widget uses it to update the amount of time remaining on the Meteor's cooldown. This `AsyncTask` will live forever until manually called `EndTask()`, which we do in the UMG Widget's `Destruct` event. See [`AsyncTaskCooldownChanged.h/cpp`](Source/GASDocumentation/Private/Characters/Abilities/AsyncTaskCooldownChanged.cpp).

![Listen for Cooldown Change BP Node](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/cooldownchange.png)

<a name="concepts-ge-cooldown-prediction"></a>
##### 4.5.15.3 Predicting Cooldowns
Cooldowns cannot really be predicted currently. We can start UI cooldown timer's when the locally predicted `Cooldown GE` is applied but the `GameplayAbility's` actual cooldown is tied to the server's cooldown's time remaining. Depending on the player's latency, the locally predicted cooldown could expire but the `GameplayAbility` would still be on cooldown on the server and this would prevent the `GameplayAbility's` immediate re-activation until the server's cooldown expires.

The Sample Project handles this by graying out the Meteor ability's UI icon when the locally predicted cooldown begins and then starting the cooldown timer once the server's corrected `Cooldown GE` comes in.

A gameplay consequence of this is that players with high latencies have a lower rate of fire on short cooldown abilities than players with lower latencies putting them at a disadvantage. Fortnite avoids this by their weapons having custom bookkeeping that do not use cooldown `GameplayEffects`.

Allowing for true predicted cooldowns (player could activate a `GameplayAbility` when the local cooldown expires but the server is still on cooldown) is something that Epic would like to implement someday in a [future iteration of GAS](#concepts-p-future).

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ge-duration"></a>
#### 4.5.16 Changing Active Gameplay Effect Duration
To change the time remaining for a `Cooldown GE` or any `Duration` `GameplayEffect`, we need to change the `GameplayEffectSpec's` `Duration`, update its `StartServerWorldTime`, update its `CachedStartServerWorldTime`, update its `StartWorldTime`, and rerun the check on the duration with `CheckDuration()`. Doing this on the server and marking the `FActiveGameplayEffect` dirty will replicate the changes to clients.
**Note:** This does involve a `const_cast` and may not be Epic's intended way of changing durations, but it seems to work well so far.

```c++
bool UPAAbilitySystemComponent::SetGameplayEffectDurationHandle(FActiveGameplayEffectHandle Handle, float NewDuration)
{
	if (!Handle.IsValid())
	{
		return false;
	}

	const FActiveGameplayEffect* ActiveGameplayEffect = GetActiveGameplayEffect(Handle);
	if (!ActiveGameplayEffect)
	{
		return false;
	}

	FActiveGameplayEffect* AGE = const_cast<FActiveGameplayEffect*>(ActiveGameplayEffect);
	if (NewDuration > 0)
	{
		AGE->Spec.Duration = NewDuration;
	}
	else
	{
		AGE->Spec.Duration = 0.01f;
	}

	AGE->StartServerWorldTime = ActiveGameplayEffects.GetServerWorldTime();
	AGE->CachedStartServerWorldTime = AGE->StartServerWorldTime;
	AGE->StartWorldTime = ActiveGameplayEffects.GetWorldTime();
	ActiveGameplayEffects.MarkItemDirty(*AGE);
	ActiveGameplayEffects.CheckDuration(Handle);

	AGE->EventSet.OnTimeChanged.Broadcast(AGE->Handle, AGE->StartWorldTime, AGE->GetDuration());
	OnGameplayEffectDurationChange(*AGE);

	return true;
}
```

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ge-dynamic"></a>
#### 4.5.17 Creating Dynamic Gameplay Effects at Runtime
Creating Dynamic `GameplayEffects` at runtime is an advanced topic. You shouldn't have to do this too often.

Only `Instant` `GameplayEffects` can be created at runtime from scratch in C++. `Duration` and `Infinite` `GameplayEffects` cannot be created dynamically at runtime because when they replicate they look for the `GameplayEffect` class definition that does not exist. To achieve this functionality, you should instead make an archetype `GameplayEffect` class like you would normally do in the Editor. Then customize the `GameplayEffectSpec` instance with what you need at runtime.

`Instant` `GameplayEffects` created at runtime can also be called from within a [local predicted](#concepts-p) `GameplayAbility`. However, it is unknown yet if the dynamic creation can have side effects.

##### Examples

The Sample Project creates one to send the gold and experience points back to the killer of a character when it takes the killing blow in its `AttributeSet`.

```c++
// Create a dynamic instant Gameplay Effect to give the bounties
UGameplayEffect* GEBounty = NewObject<UGameplayEffect>(GetTransientPackage(), FName(TEXT("Bounty")));
GEBounty->DurationPolicy = EGameplayEffectDurationType::Instant;

int32 Idx = GEBounty->Modifiers.Num();
GEBounty->Modifiers.SetNum(Idx + 2);

FGameplayModifierInfo& InfoXP = GEBounty->Modifiers[Idx];
InfoXP.ModifierMagnitude = FScalableFloat(GetXPBounty());
InfoXP.ModifierOp = EGameplayModOp::Additive;
InfoXP.Attribute = UGDAttributeSetBase::GetXPAttribute();

FGameplayModifierInfo& InfoGold = GEBounty->Modifiers[Idx + 1];
InfoGold.ModifierMagnitude = FScalableFloat(GetGoldBounty());
InfoGold.ModifierOp = EGameplayModOp::Additive;
InfoGold.Attribute = UGDAttributeSetBase::GetGoldAttribute();

Source->ApplyGameplayEffectToSelf(GEBounty, 1.0f, Source->MakeEffectContext());
```

A second example shows a runtime `GameplayEffect` created within a local predicted `GameplayAbility`. Use at your own risk (see comments in code)!

```c++
UGameplayAbilityRuntimeGE::UGameplayAbilityRuntimeGE()
{
	NetExecutionPolicy = EGameplayAbilityNetExecutionPolicy::LocalPredicted;
}

void UGameplayAbilityRuntimeGE::ActivateAbility(const FGameplayAbilitySpecHandle Handle, const FGameplayAbilityActorInfo* ActorInfo, const FGameplayAbilityActivationInfo ActivationInfo, const FGameplayEventData* TriggerEventData)
{
	if (HasAuthorityOrPredictionKey(ActorInfo, &ActivationInfo))
	{
		if (!CommitAbility(Handle, ActorInfo, ActivationInfo))
		{
			EndAbility(Handle, ActorInfo, ActivationInfo, true, true);
		}

		// Create the GE at runtime.
		UGameplayEffect* GameplayEffect = NewObject<UGameplayEffect>(GetTransientPackage(), TEXT("RuntimeInstantGE"));
		GameplayEffect->DurationPolicy = EGameplayEffectDurationType::Instant; // Only instant works with runtime GE.

		// Add a simple scalable float modifier, which overrides MyAttribute with 42.
		// In real world applications, consume information passed via TriggerEventData.
		const int32 Idx = GameplayEffect->Modifiers.Num();
		GameplayEffect->Modifiers.SetNum(Idx + 1);
		FGameplayModifierInfo& ModifierInfo = GameplayEffect->Modifiers[Idx];
		ModifierInfo.Attribute.SetUProperty(UMyAttributeSet::GetMyModifiedAttribute());
		ModifierInfo.ModifierMagnitude = FScalableFloat(42.f);
		ModifierInfo.ModifierOp = EGameplayModOp::Override;

		// Apply the GE.

		// Create the GESpec here to avoid the behavior of ASC to create GESpecs from the GE class default object.
		// Since we have a dynamic GE here, this would create a GESpec with the base GameplayEffect class, so we
		// would lose our modifiers. Attention: It is unknown, if this "hack" done here can have drawbacks!
		// The spec prevents the GE object being collected by the GarbageCollector, since the GE is a UPROPERTY on the spec.
		FGameplayEffectSpec* GESpec = new FGameplayEffectSpec(GameplayEffect, {}, 0.f); // "new", since lifetime is managed by a shared ptr within the handle
		ApplyGameplayEffectSpecToOwner(Handle, ActorInfo, ActivationInfo, FGameplayEffectSpecHandle(GESpec));
	}
	EndAbility(Handle, ActorInfo, ActivationInfo, false, false);
}
```

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ge-containers"></a>
#### 4.5.18 Gameplay Effect Containers
Epic's [Action RPG Sample Project](https://www.unrealengine.com/marketplace/en-US/product/action-rpg) implements a structure called `FGameplayEffectContainer`. These are not in vanilla GAS but are extremely handy for containing `GameplayEffects` and [`TargetData`](#concepts-targeting-data). It automates some of the effort like creating `GameplayEffectSpecs` from `GameplayEffects` and setting default values in its `GameplayEffectContext`. Making a `GameplayEffectContainer` in a `GameplayAbility` and passing it to spawned projectiles is very easy and straightforward. I opted not to implement the `GameplayEffectContainers` in the included Sample Project to show how you would work without them in vanilla GAS, but I highly recommend looking into them and considering adding them to your project.

To access the `GESpecs` inside of the `GameplayEffectContainers` to do things like adding `SetByCallers`, break the `FGameplayEffectContainer` and access the `GESpec` reference by its index in the array of `GESpecs`. This requires that you know the index ahead of time of the `GESpec` that you want to access.

![SetByCaller with a GameplayEffectContainer](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/gecontainersetbycaller.png)

`GameplayEffectContainers` also contain an optional efficient means of [targeting](#concepts-targeting-containers).

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ga"></a>
### 4.6 Gameplay Abilities

<a name="concepts-ga-definition"></a>
#### 4.6.1 Gameplay Ability Definition
[`GameplayAbilities`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/Abilities/UGameplayAbility/index.html) (`GA`) are any actions or skills that an `Actor` can do in the game. More than one `GameplayAbility` can be active at one time for example sprinting and shooting a gun. These can be made in Blueprint or C++.

Examples of `GameplayAbilities`:
* Jumping
* Sprinting
* Shooting a gun
* Passively blocking an attack every X number of seconds
* Using a potion
* Opening a door
* Collecting a resource
* Constructing a building

Things that should not be implemented with `GameplayAbilities`:
* Basic movement input
* Some interactions with UIs - Don't use a `GameplayAbility` to purchase an item from a store.

These are not rules, just my recommendations. Your design and implementations may vary.

`GameplayAbilities` come with default functionality to have a level to modify the amount of change to attributes or to change the `GameplayAbility's` functionality.

`GameplayAbilities` run on the owning client and/or the server depending on the [`Net Execution Policy`](#concepts-ga-net) but not simulated proxies. The `Net Execution Policy` determines if a `GameplayAbility` will be locally [predicted](#concepts-p). They include default behavior for [optional cost and cooldown `GameplayEffects`](#concepts-ga-commit). `GameplayAbilities` use [`AbilityTasks`](#concepts-at) for actions that happen over time like waiting for an event, waiting for an attribute change, waiting for players to choose a target, or moving a `Character` with `Root Motion Source`. **Simulated clients will not run `GameplayAbilities`**. Instead, when the server runs the ability, anything that visually needs to play on the simulated proxies (like animation montages) will be replicated or RPC'd through `AbilityTasks` or [`GameplayCues`](#concepts-gc) for cosmetic things like sounds and particles.

All `GameplayAbilities` will have their `ActivateAbility()` function overriden with your gameplay logic. Additional logic can be added to `EndAbility()` that runs when the `GameplayAbility` completes or is canceled.

Flowchart of a simple `GameplayAbility`:
![Simple GameplayAbility Flowchart](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/abilityflowchartsimple.png)


Flowchart of a more complex `GameplayAbility`:
![Complex GameplayAbility Flowchart](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/abilityflowchartcomplex.png)

Complex abilities can be implemented using multiple `GameplayAbilities` that interact (activate, cancel, etc) with each other.

<a name="concepts-ga-definition-reppolicy"></a>
##### 4.6.1.1 Replication Policy
Don't use this option. The name is misleading and you don't need it. [`GameplayAbilitySpecs`](#concepts-ga-spec) are replicated from the server to the owning client by default. As mentioned above, **`GameplayAbilities` don't run on simulated proxies**. They use `AbilityTasks` and `GameplayCues` to replicate or RPC visual changes to the simulated proxies. Dave Ratti from Epic has stated his desire to [remove this option in the future](https://epicgames.ent.box.com/s/m1egifkxv3he3u3xezb9hzbgroxyhx89).

<a name="concepts-ga-definition-remotecancel"></a>
##### 4.6.1.2 Server Respects Remote Ability Cancellation
This option causes trouble more often than not. It means if the client's `GameplayAbility` ends either due to cancellation or natural completion, it will force the server's version to end whether it completed or not. The latter issue is the important one, especially for locally predicted `GameplayAbilities` used by players with high latencies. Generally you will want to disable this option.

<a name="concepts-ga-definition-repinputdirectly"></a>
##### 4.6.1.3 Replicate Input Directly
Setting this option will always replicate input press and release events to the server. Epic recommends not using this and instead relying on the `Generic Replicated Events` that are built into the existing input related [`AbilityTasks`](#concepts-at) if you have your [input bound to your `ASC`](#concepts-ga-input).

Epic's comment:
```c++
/** Direct Input state replication. These will be called if bReplicateInputDirectly is true on the ability and is generally not a good thing to use. (Instead, prefer to use Generic Replicated Events). */
UAbilitySystemComponent::ServerSetInputPressed()
```

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ga-input"></a>
#### 4.6.2 Binding Input to the ASC
The `ASC` allows you to directly bind input actions to it and assign those inputs to `GameplayAbilities` when you grant them. Input actions assigned to `GameplayAbilities` automatically activate those `GameplayAbilities` when pressed if the `GameplayTag` requirements are met. Assigned input actions are required to use the built-in `AbilityTasks` that respond to input.

In addition to input actions assigned to activate `GameplayAbilities`, the `ASC` also accepts generic `Confirm` and `Cancel` inputs. These special inputs are used by `AbilityTasks` for confirming things like [`Target Actors`](#concepts-targeting-actors) or canceling them.

To bind input to an `ASC`, you must first create an enum that translates the input action name to a byte. The enum name must match exactly to the name used for the input action in the project settings. The `DisplayName` does not matter.

From the Sample Project:
```c++
UENUM(BlueprintType)
enum class EGDAbilityInputID : uint8
{
	// 0 None
	None			UMETA(DisplayName = "None"),
	// 1 Confirm
	Confirm			UMETA(DisplayName = "Confirm"),
	// 2 Cancel
	Cancel			UMETA(DisplayName = "Cancel"),
	// 3 LMB
	Ability1		UMETA(DisplayName = "Ability1"),
	// 4 RMB
	Ability2		UMETA(DisplayName = "Ability2"),
	// 5 Q
	Ability3		UMETA(DisplayName = "Ability3"),
	// 6 E
	Ability4		UMETA(DisplayName = "Ability4"),
	// 7 R
	Ability5		UMETA(DisplayName = "Ability5"),
	// 8 Sprint
	Sprint			UMETA(DisplayName = "Sprint"),
	// 9 Jump
	Jump			UMETA(DisplayName = "Jump")
};
```

If your `ASC` lives on the `Character`, then in `SetupPlayerInputComponent()` include the function for binding to the `ASC`:
```c++
// Bind to AbilitySystemComponent
FTopLevelAssetPath AbilityEnumAssetPath = FTopLevelAssetPath(FName("/Script/GASDocumentation"), FName("EGDAbilityInputID"));
AbilitySystemComponent->BindAbilityActivationToInputComponent(PlayerInputComponent, FGameplayAbilityInputBinds(FString("ConfirmTarget"),
	FString("CancelTarget"), AbilityEnumAssetPath, static_cast<int32>(EGDAbilityInputID::Confirm), static_cast<int32>(EGDAbilityInputID::Cancel)));
```

If your `ASC` lives on the `PlayerState`, there is a potential race condition inside of `SetupPlayerInputComponent()` where the `PlayerState` may not have replicated to the client yet. Therefore, I recommend attempting to bind to input in `SetupPlayerInputComponent()` and `OnRep_PlayerState()`. `OnRep_PlayerState()` is not sufficient by itself because there could be a case where the `Actor's` `InputComponent` could be null when `PlayerState` replicates before the `PlayerController` tells the client to call `ClientRestart()` which creates the `InputComponent`. The Sample Project demonstrates attempting to bind in both locations with a boolean gating the process so it only actually binds the input once.

**Note:** In the Sample Project `Confirm` and `Cancel` in the enum don't match the input action names in the project settings (`ConfirmTarget` and `CancelTarget`), but we supply the mapping between them in `BindAbilityActivationToInputComponent()`. These are special since we supply the mapping and they don't have to match, but they can match. All other inputs in the enum must match the input action names in the project settings.

For `GameplayAbilities` that will only ever be activated by one input (they will always exist in the same "slot" like a MOBA), I prefer to add a variable to my `UGameplayAbility` subclass where I can define their input. I can then read this from the `ClassDefaultObject` when granting the ability.

<a name="concepts-ga-input-noactivate"></a>
##### 4.6.2.1 Binding to Input without Activating Abilities
If you don't want your `GameplayAbilities` to automatically activate when an input is pressed but still bind them to input to use with `AbilityTasks`, you can add a new bool variable to your `UGameplayAbility` subclass, `bActivateOnInput`, that defaults to `true` and override `UAbilitySystemComponent::AbilityLocalInputPressed()`.

```c++
void UGSAbilitySystemComponent::AbilityLocalInputPressed(int32 InputID)
{
	// Consume the input if this InputID is overloaded with GenericConfirm/Cancel and the GenericConfim/Cancel callback is bound
	if (IsGenericConfirmInputBound(InputID))
	{
		LocalInputConfirm();
		return;
	}

	if (IsGenericCancelInputBound(InputID))
	{
		LocalInputCancel();
		return;
	}

	// ---------------------------------------------------------

	ABILITYLIST_SCOPE_LOCK();
	for (FGameplayAbilitySpec& Spec : ActivatableAbilities.Items)
	{
		if (Spec.InputID == InputID)
		{
			if (Spec.Ability)
			{
				Spec.InputPressed = true;
				if (Spec.IsActive())
				{
					if (Spec.Ability->bReplicateInputDirectly && IsOwnerActorAuthoritative() == false)
					{
						ServerSetInputPressed(Spec.Handle);
					}

					AbilitySpecInputPressed(Spec);

					// Invoke the InputPressed event. This is not replicated here. If someone is listening, they may replicate the InputPressed event to the server.
					InvokeReplicatedEvent(EAbilityGenericReplicatedEvent::InputPressed, Spec.Handle, Spec.ActivationInfo.GetActivationPredictionKey());
				}
				else
				{
					UGSGameplayAbility* GA = Cast<UGSGameplayAbility>(Spec.Ability);
					if (GA && GA->bActivateOnInput)
					{
						// Ability is not active, so try to activate it
						TryActivateAbility(Spec.Handle);
					}
				}
			}
		}
	}
}
```

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ga-granting"></a>
#### 4.6.3 Granting Abilities
Granting a `GameplayAbility` to an `ASC` adds it to the `ASC's` list of `ActivatableAbilities` allowing it to activate the `GameplayAbility` at will if it meets the [`GameplayTag` requirements](#concepts-ga-tags).

We grant `GameplayAbilities` on the server which then automatically replicates the [`GameplayAbilitySpec`](#concepts-ga-spec) to the owning client. Other clients / simulated proxies do not receive the `GameplayAbilitySpec`.

The Sample Project stores a `TArray<TSubclassOf<UGDGameplayAbility>>` on the `Character` class that it reads from and grants when the game starts:
```c++
void AGDCharacterBase::AddCharacterAbilities()
{
	// Grant abilities, but only on the server	
	if (Role != ROLE_Authority || !AbilitySystemComponent.IsValid() || AbilitySystemComponent->bCharacterAbilitiesGiven)
	{
		return;
	}

	for (TSubclassOf<UGDGameplayAbility>& StartupAbility : CharacterAbilities)
	{
		AbilitySystemComponent->GiveAbility(
			FGameplayAbilitySpec(StartupAbility, GetAbilityLevel(StartupAbility.GetDefaultObject()->AbilityID), static_cast<int32>(StartupAbility.GetDefaultObject()->AbilityInputID), this));
	}

	AbilitySystemComponent->bCharacterAbilitiesGiven = true;
}
```

When granting these `GameplayAbilities`, we're creating `GameplayAbilitySpecs` with the `UGameplayAbility` class, the ability level, the input that it is bound to, and the `SourceObject` or who gave this `GameplayAbility` to this `ASC`.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ga-activating"></a>
#### 4.6.4 Activating Abilities
If a `GameplayAbility` is assigned an input action, it will be automatically activated if the input is pressed and it meets its `GameplayTag` requirements. This may not always be the desirable way to activate a `GameplayAbility`. The `ASC` provides four other methods of activating `GameplayAbilities`: by `GameplayTag`, `GameplayAbility` class, `GameplayAbilitySpec` handle, and by an event. Activating a `GameplayAbility` by event allows you to [pass in a payload of data with the event](#concepts-ga-data).

```c++
UFUNCTION(BlueprintCallable, Category = "Abilities")
bool TryActivateAbilitiesByTag(const FGameplayTagContainer& GameplayTagContainer, bool bAllowRemoteActivation = true);

UFUNCTION(BlueprintCallable, Category = "Abilities")
bool TryActivateAbilityByClass(TSubclassOf<UGameplayAbility> InAbilityToActivate, bool bAllowRemoteActivation = true);

bool TryActivateAbility(FGameplayAbilitySpecHandle AbilityToActivate, bool bAllowRemoteActivation = true);

bool TriggerAbilityFromGameplayEvent(FGameplayAbilitySpecHandle AbilityToTrigger, FGameplayAbilityActorInfo* ActorInfo, FGameplayTag Tag, const FGameplayEventData* Payload, UAbilitySystemComponent& Component);

FGameplayAbilitySpecHandle GiveAbilityAndActivateOnce(const FGameplayAbilitySpec& AbilitySpec, const FGameplayEventData* GameplayEventData);
```
To activate a `GameplayAbility` by event, the `GameplayAbility` must have its `Triggers` set up in the `GameplayAbility`. Assign a `GameplayTag` and pick an option for `GameplayEvent`. To send the event, use the function `UAbilitySystemBlueprintLibrary::SendGameplayEventToActor(AActor* Actor, FGameplayTag EventTag, FGameplayEventData Payload)`. Activating a `GameplayAbility` by event allows you to pass in a payload with data.

`GameplayAbility` `Triggers` also allow you to activate the `GameplayAbility` when a `GameplayTag` is added or removed.

**Note:** When activating a `GameplayAbility` from event in Blueprint, you must use the `ActivateAbilityFromEvent` node and the standard `ActivateAbility` node **cannot exist** in your graph. If the `ActivateAbility` node exists, it will always be called over the `ActivateAbilityFromEvent` node.

**Note:** Don't forget to call `EndAbility()` when the `GameplayAbility` should terminate unless you have a `GameplayAbility` that will always run like a passive ability.

Activation sequence for **locally predicted** `GameplayAbilities`:
1. **Owning client** calls `TryActivateAbility()`
1. Calls `InternalTryActivateAbility()`
1. Calls `CanActivateAbility()` and returns whether `GameplayTag` requirements are met, if the `ASC` can afford the cost, if the `GameplayAbility` is not on cooldown, and if no other instances are currently active
1. Calls `CallServerTryActivateAbility()` and passes it the `Prediction Key` that it generates
1. Calls `CallActivateAbility()`
1. Calls `PreActivate()` Epic refers to this as "boilerplate init stuff"
1. Calls `ActivateAbility()` finally activating the ability

**Server** receives `CallServerTryActivateAbility()`
1. Calls `ServerTryActivateAbility()`
1. Calls `InternalServerTryActivateAbility()` 
1. Calls `InternalTryActivateAbility()`
1. Calls `CanActivateAbility()` and returns whether `GameplayTag` requirements are met, if the `ASC` can afford the cost, if the `GameplayAbility` is not on cooldown, and if no other instances are currently active
1. Calls `ClientActivateAbilitySucceed()` if successful telling it to update its `ActivationInfo` that its activation was confirmed by the server and broadcasting the `OnConfirmDelegate` delegate. This is not the same as input confirmation.
1. Calls `CallActivateAbility()`
1. Calls `PreActivate()` Epic refers to this as "boilerplate init stuff"
1. Calls `ActivateAbility()` finally activating the ability

If at any time the server fails to activate, it will call `ClientActivateAbilityFailed()`, immediately terminating the client's `GameplayAbility` and undoing any predicted changes.

<a name="concepts-ga-activating-passive"></a>
##### 4.6.4.1 Passive Abilities
To implement passive `GameplayAbilities` that automatically activate and run continuously, override `UGameplayAbility::OnAvatarSet()` which is automatically called when a `GameplayAbility` is granted and the `AvatarActor` is set and call `TryActivateAbility()`.

I recommend adding a `bool` to your custom `UGameplayAbility` class specifying if the `GameplayAbility` should be activated when granted. The Sample Project does this for its passive armor stacking ability.

Passive `GameplayAbilities` will typically have a [`Net Execution Policy`](#concepts-ga-net) of `Server Only`.

```c++
void UGDGameplayAbility::OnAvatarSet(const FGameplayAbilityActorInfo * ActorInfo, const FGameplayAbilitySpec & Spec)
{
	Super::OnAvatarSet(ActorInfo, Spec);

	if (bActivateAbilityOnGranted)
	{
		ActorInfo->AbilitySystemComponent->TryActivateAbility(Spec.Handle, false);
	}
}
```

Epic describes this function as the correct place to initiate passive abilities and to do `BeginPlay` type things.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ga-activating-failedtags"></a>
##### 4.6.4.2 Activation Failed Tags

Abilities have default logic to tell you why an ability activation failed. To enable this, you must set up the GameplayTags that correspond to the default failure cases.

Add these tags (or your own naming convention) to your project:
```
+GameplayTagList=(Tag="Activation.Fail.BlockedByTags",DevComment="")
+GameplayTagList=(Tag="Activation.Fail.CantAffordCost",DevComment="")
+GameplayTagList=(Tag="Activation.Fail.IsDead",DevComment="")
+GameplayTagList=(Tag="Activation.Fail.MissingTags",DevComment="")
+GameplayTagList=(Tag="Activation.Fail.Networking",DevComment="")
+GameplayTagList=(Tag="Activation.Fail.OnCooldown",DevComment="")
```

Then add them to the [`GASDocumentation\Config\DefaultGame.ini`](https://github.com/tranek/GASDocumentation/blob/master/Config/DefaultGame.ini#L8-L13):
```
[/Script/GameplayAbilities.AbilitySystemGlobals]
ActivateFailIsDeadName=Activation.Fail.IsDead
ActivateFailCooldownName=Activation.Fail.OnCooldown
ActivateFailCostName=Activation.Fail.CantAffordCost
ActivateFailTagsBlockedName=Activation.Fail.BlockedByTags
ActivateFailTagsMissingName=Activation.Fail.MissingTags
ActivateFailNetworkingName=Activation.Fail.Networking
```

Now whenever an ability activation fails, this corresponding GameplayTag will be included in output log messages or visible on the `showdebug AbilitySystem` hud.
```
LogAbilitySystem: Display: InternalServerTryActivateAbility. Rejecting ClientActivation of Default__GA_FireGun_C. InternalTryActivateAbility failed: Activation.Fail.BlockedByTags
LogAbilitySystem: Display: ClientActivateAbilityFailed_Implementation. PredictionKey :109 Ability: Default__GA_FireGun_C
```

![Activation Failed Tags Displayed in showdebug AbilitySystem](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/activationfailedtags.png)

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ga-cancelabilities"></a>
#### 4.6.5 Canceling Abilities
To cancel a `GameplayAbility` from within, you call `CancelAbility()`. This will call `EndAbility()` and set its `WasCancelled` parameter to true.

To cancel a `GameplayAbility` externally, the `ASC` provides a few functions:

```c++
/** Cancels the specified ability CDO. */
void CancelAbility(UGameplayAbility* Ability);	

/** Cancels the ability indicated by passed in spec handle. If handle is not found among reactivated abilities nothing happens. */
void CancelAbilityHandle(const FGameplayAbilitySpecHandle& AbilityHandle);

/** Cancel all abilities with the specified tags. Will not cancel the Ignore instance */
void CancelAbilities(const FGameplayTagContainer* WithTags=nullptr, const FGameplayTagContainer* WithoutTags=nullptr, UGameplayAbility* Ignore=nullptr);

/** Cancels all abilities regardless of tags. Will not cancel the ignore instance */
void CancelAllAbilities(UGameplayAbility* Ignore=nullptr);

/** Cancels all abilities and kills any remaining instanced abilities */
virtual void DestroyActiveState();
```

**Note:** I have found that `CancelAllAbilities` doesn't seem to work right if you have a `Non-Instanced` `GameplayAbilities`. It seems to hit the `Non-Instanced` `GameplayAbility` and give up. `CancelAbilities` can handle `Non-Instanced` `GameplayAbilities` better and that is what the Sample Project uses (Jump is a non-instanced `GameplayAbility`). Your mileage may vary.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ga-definition-activeability"></a>
#### 4.6.6 Getting Active Abilities
Beginners often ask "How can I get the active ability?" perhaps to set variables on it or to cancel it. More than one `GameplayAbility` can be active at a time so there is no one "active ability". Instead, you must search through an `ASC's` list of `ActivatableAbilities` (granted `GameplayAbilities` that the `ASC` owns) and find the one matching the [`Asset` or `Granted` `GameplayTag`](#concepts-ga-tags) that you are looking for.

`UAbilitySystemComponent::GetActivatableAbilities()` returns a `TArray<FGameplayAbilitySpec>` for you to iterate over.

The `ASC` also has another helper function that takes in a `GameplayTagContainer` as a parameter to assist in searching instead of manually iterating over the list of `GameplayAbilitySpecs`. The `bOnlyAbilitiesThatSatisfyTagRequirements` parameter will only return `GameplayAbilitySpecs` that satisfy their `GameplayTag` requirements and could be activated right now. For example, you could have two basic attack `GameplayAbilities`, one with a weapon and one with bare fists, and the correct one activates depending on if a weapon is equipped setting the `GameplayTag` requirement. See Epic's comment on the function for more information.
```c++
UAbilitySystemComponent::GetActivatableGameplayAbilitySpecsByAllMatchingTags(const FGameplayTagContainer& GameplayTagContainer, TArray < struct FGameplayAbilitySpec* >& MatchingGameplayAbilities, bool bOnlyAbilitiesThatSatisfyTagRequirements = true)
```

Once you get the `FGameplayAbilitySpec` that you are looking for, you can call `IsActive()` on it.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ga-instancing"></a>
#### 4.6.7 Instancing Policy
A `GameplayAbility's` `Instancing Policy` determines if and how the `GameplayAbility` is instanced when activated.

| `Instancing Policy`     | Description                                                                                      | Example of when to use                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Instanced Per Actor     | Each `ASC` only has one instance of the `GameplayAbility` that is reused between activations.    | This will probably be the `Instancing Policy` that you use the most. You can use it for any ability and provides persistence between activations. The designer is responsible for manually resetting any variables between activations that need it.                                                                                                                                                               |
| Instanced Per Execution | Every time a `GameplayAbility` is activated, a new instance of the `GameplayAbility` is created. | The benefit of these `GameplayAbilities` is that the variables are reset everytime you activate. These provide worse performance than `Instanced Per Actor` since they will spawn new `GameplayAbilities` every time they activate. The Sample Project does not use any of these.                                                                                                                                 |
| Non-Instanced           | The `GameplayAbility` operates on its `ClassDefaultObject`. No instances are created.            | This has the best performance of the three but is the most restrictive in what can be done with it. `Non-Instanced` `GameplayAbilities` cannot store state, meaning no dynamic variables and no binding to `AbilityTask` delegates. The best place to use them is for frequently used simple abilities like minion basic attacks in a MOBA or RTS. The Sample Project's Jump `GameplayAbility` is `Non-Instanced`. |

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ga-net"></a>
#### 4.6.8 Net Execution Policy
A `GameplayAbility's` `Net Execution Policy` determines who runs the `GameplayAbility` and in what order.

| `Net Execution Policy` | Description                                                                                                                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Local Only`           | The `GameplayAbility` is only run on the owning client. This could be useful for abilities that only make local cosmetic changes. Single player games should use `Server Only`.                                     |
| `Local Predicted`      | `Local Predicted` `GameplayAbilities` activate first on the owning client and then on the server. The server's version will correct anything that the client predicted incorrectly. See [Prediction](#concepts-p). |
| `Server Only`          | The `GameplayAbility` is only run on the server. Passive `GameplayAbilities` will typically be `Server Only`. Single player games should use this.                                                                  |
| `Server Initiated`     | `Server Initiated` `GameplayAbilities` activate first on the server and then on the owning client. I personally haven't used these much if any.                                                                     | 

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ga-tags"></a>
#### 4.6.9 Ability Tags
`GameplayAbilities` come with `GameplayTagContainers` with built-in logic. None of these `GameplayTags` are replicated.

| `GameplayTag Container`     | Description                                                                                                                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Ability Tags`              | `GameplayTags` that the `GameplayAbility` owns. These are just `GameplayTags` to describe the `GameplayAbility`.                                                                              |
| `Cancel Abilities with Tag` | Other `GameplayAbilities` that have these `GameplayTags` in their `Ability Tags` will be canceled when this `GameplayAbility` is activated.                                                   |
| `Block Abilities with Tag`  | Other `GameplayAbilities` that have these `GameplayTags` in their `Ability Tags` are blocked from activating while this `GameplayAbility` is active.                                          |
| `Activation Owned Tags`     | These `GameplayTags` are given to the `GameplayAbility's` owner while this `GameplayAbility` is active. Remember these are not replicated.                                                    |
| `Activation Required Tags`  | This `GameplayAbility` can only be activated if the owner has **all** of these `GameplayTags`.                                                                                                |
| `Activation Blocked Tags`   | This `GameplayAbility` cannot be activated if the owner has **any** of these `GameplayTags`.                                                                                                  |
| `Source Required Tags`      | This `GameplayAbility` can only be activated if the `Source` has **all** of these `GameplayTags`. The `Source` `GameplayTags` are only set if the `GameplayAbility` is triggered by an event. |
| `Source Blocked Tags`       | This `GameplayAbility` cannot be activated if the `Source` has **any** of these `GameplayTags`. The `Source` `GameplayTags` are only set if the `GameplayAbility` is triggered by an event.   |
| `Target Required Tags`      | This `GameplayAbility` can only be activated if the `Target` has **all** of these `GameplayTags`. The `Target` `GameplayTags` are only set if the `GameplayAbility` is triggered by an event. |
| `Target Blocked Tags`       | This `GameplayAbility` cannot be activated if the `Target` has **any** of these `GameplayTags`. The `Target` `GameplayTags` are only set if the `GameplayAbility` is triggered by an event.   |

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ga-spec"></a>
#### 4.6.10 Gameplay Ability Spec
A `GameplayAbilitySpec` exists on the `ASC` after a `GameplayAbility` is granted and defines the activatable `GameplayAbility` - `GameplayAbility` class, level, input bindings, and runtime state that must be kept separate from the `GameplayAbility` class.

When a `GameplayAbility` is granted on the server, the server replicates the `GameplayAbilitySpec` to the owning client so that she may activate it.

Activating a `GameplayAbilitySpec` will create an instance (or not for `Non-Instanced` `GameplayAbilities`) of the `GameplayAbility` depending on its `Instancing Policy`.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ga-data"></a>
#### 4.6.11 Passing Data to Abilities
The general paradigm for `GameplayAbilities` is `Activate->Generate Data->Apply->End`. Sometimes you need to act on existing data. GAS provides a few options for getting external data into your `GameplayAbilities`:

| Method                                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Activate `GameplayAbility` by Event             | Activate a `GameplayAbility` with an event containing a payload of data. The event's payload is replicated from client to server for local predicted `GameplayAbilities`. Use the two `Optional Object` or the [`TargetData`](#concepts-targeting-data) variables for arbitrary data that does not fit any of the existing variables. The downside to this is that it prevents you from activating the ability with an input bind. To activate a `GameplayAbility` by event, the `GameplayAbility` must have its `Triggers` set up in the `GameplayAbility`. Assign a `GameplayTag` and pick an option for `GameplayEvent`. To send the event, use the function `UAbilitySystemBlueprintLibrary::SendGameplayEventToActor(AActor* Actor, FGameplayTag EventTag, FGameplayEventData Payload)`. |
| Use `WaitGameplayEvent` `AbilityTask`           | Use the `WaitGameplayEvent` `AbilityTask` to tell the `GameplayAbility` to listen for an event with payload data after it activates. The event payload and the process to send it is the same as activating `GameplayAbilities` by event. The downside to this is that events are not replicated by the `AbilityTask` and should only be used for `Local Only` and `Server Only` `GameplayAbilities`. You potentially could write your own `AbilityTask` that will replicate the event payload.                                                                                                                                                                                                                                                                                               |
| Use `TargetData`                                | A custom `TargetData` struct is a good way to pass arbitrary data between the client and server.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Store Data on the `OwnerActor` or `AvatarActor` | Use replicated variables stored on the `OwnerActor`, `AvatarActor`, or any other object that you can get a reference to. This method is the most flexible and will work with `GameplayAbilities` activated by input binds. However, it does not guarantee the data will be synchronized from replication at the time of use. You must ensure that ahead of time - meaning if you set a replicated variable and then immediately activate a `GameplayAbility` there is no guarantee the order that will happen on the receiver due to potential packet loss.                                                                                                                                                                                                                                   |

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ga-commit"></a>
#### 4.6.12 Ability Cost and Cooldown
`GameplayAbilities` come with functionality for optional costs and cooldowns. Costs are predefined amounts of `Attributes` that the `ASC` must have in order to activate the `GameplayAbility` implemented with an `Instant` `GameplayEffect` ([`Cost GE`](#concepts-ge-cost)). Cooldowns are timers that prevent the reactivation of a `GameplayAbility` until it expires and is implemented with a `Duration` `GameplayEffect` ([`Cooldown GE`](#concepts-ge-cooldown)).

Before a `GameplayAbility` calls `UGameplayAbility::Activate()`, it calls `UGameplayAbility::CanActivateAbility()`. This function checks if the owning `ASC` can afford the cost (`UGameplayAbility::CheckCost()`) and ensures that the `GameplayAbility` is not on cooldown (`UGameplayAbility::CheckCooldown()`).

After a `GameplayAbility` calls `Activate()`, it can optionally commit the cost and cooldown at any time using `UGameplayAbility::CommitAbility()` which calls `UGameplayAbility::CommitCost()` and `UGameplayAbility::CommitCooldown()`. The designer may choose to call `CommitCost()` or `CommitCooldown()` separately if they shouldn't be committed at the same time. Committing cost and cooldown calls `CheckCost()` and `CheckCooldown()` one more time and is the last chance for the `GameplayAbility` to fail related to them. The owning `ASC's` `Attributes` could potentially change after a `GameplayAbility` is activated, failing to meet the cost at time of commit. Committing the cost and cooldown can be [locally predicted](#concepts-p) if the [prediction key](#concepts-p-key) is valid at the time of commit.

See [`CostGE`](#concepts-ge-cost) and [`CooldownGE`](#concepts-ge-cooldown) for implementation details.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ga-leveling"></a>
#### 4.6.13 Leveling Up Abilities
There are two common methods for leveling up an ability:

| Level Up Method                            | Description                                                                                                                                                                                                      |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ungrant and Regrant at the New Level       | Ungrant (remove) the `GameplayAbility` from the `ASC` and regrant it back at the next level on the server. This terminates the `GameplayAbility` if it was active at the time.                                   |
| Increase the `GameplayAbilitySpec's` Level | On the server, find the `GameplayAbilitySpec`, increase its level, and mark it dirty so that replicates to the owning client. This method does not terminate the `GameplayAbility` if it was active at the time. |

The main difference between the two methods is if you want active `GameplayAbilities` to be canceled at the time of level up. You will most likely use both methods depending on your `GameplayAbilities`. I recommend adding a `bool` to your `UGameplayAbility` subclass specifying which method to use.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ga-sets"></a>
#### 4.6.14 Ability Sets
`GameplayAbilitySets` are convenience `UDataAsset` classes for holding input bindings and lists of startup `GameplayAbilities` for Characters with logic to grant the `GameplayAbilities`. Subclasses can also include extra logic or properties. Paragon had a `GameplayAbilitySet` per hero that included all of their given `GameplayAbilities`.

I find this class to be unnecessary at least given what I've seen of it so far. The Sample Project handles all of the functionality of `GameplayAbilitySets` inside of the `GDCharacterBase` and its subclasses.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ga-batching"></a>
#### 4.6.15 Ability Batching
Traditional `Gameplay Ability` lifecycle involves a minimum of two or three RPCs from the client to the server.

1. `CallServerTryActivateAbility()`
1. `ServerSetReplicatedTargetData()` (Optional)
1. `ServerEndAbility()`

If a `GameplayAbility` performs all of these actions in one atomic grouping in a frame, we can optimize this workflow to batch (combine) all two or three RPCs into one RPC. `GAS` refers to this RPC optimization as `Ability Batching`. The common example of when to use `Ability Batching` is for hitscan guns. Hitscan guns activate, do a line trace, send the [`TargetData`](#concepts-targeting-data) to the server, and end the ability all in one atomic group in one frame. The [GASShooter](https://github.com/tranek/GASShooter) sample project demonstrates this technique for its hitscan guns.

Semi-Automatic guns are the best case scenario and batch the `CallServerTryActivateAbility()`, `ServerSetReplicatedTargetData()` (the bullet hit result), and `ServerEndAbility()` into one RPC instead of three RPCs.

Full-Automatic/Burst guns batch `CallServerTryActivateAbility()` and `ServerSetReplicatedTargetData()` for the first bullet into one RPC instead of two RPCs. Each subsequent bullet is its own `ServerSetReplicatedTargetData()` RPC. Finally, `ServerEndAbility()` is sent as a separate RPC when the gun stops firing. This is a worst case scenario where we only save one RPC on the first bullet instead of two. This scenario could have also been implemented with activating the ability via a [`Gameplay Event`](#concepts-ga-data) which would send the bullet's `TargetData` in with the `EventPayload` to the server from the client. The downside of the latter approach is that the `TargetData` would have to be generated externally to the ability whereas the batching approach generates the `TargetData` inside of the ability.

`Ability Batching` is disabled by default on the [`ASC`](#concepts-asc). To enable `Ability Batching`, override `ShouldDoServerAbilityRPCBatch()` to return true:

```c++
virtual bool ShouldDoServerAbilityRPCBatch() const override { return true; }
```

Now that `Ability Batching` is enabled, before activating abilities that you want batched, you must create a `FScopedServerAbilityRPCBatcher` struct beforehand. This special struct will try to batch any abilities following it within its scope. Once the `FScopedServerAbilityRPCBatcher` falls out of scope, any abilities activated will not try to batch. `FScopedServerAbilityRPCBatcher` works by having special code in each of the functions that can be batched that intercepts the call from sending the RPC and instead packs the message into a batch struct. When `FScopedServerAbilityRPCBatcher` falls out of scope, it automatically RPCs this batch struct to the server in `UAbilitySystemComponent::EndServerAbilityRPCBatch()`. The server receives the batch RPC in `UAbilitySystemComponent::ServerAbilityRPCBatch_Internal(FServerAbilityRPCBatch& BatchInfo)`. The `BatchInfo` parameter will contain flags for if the ability should end and if input was pressed at the time of activation and the `TargetData` if that was included. This is a good function to put a breakpoint on to confirm that your batching is working properly. Alternatively, use the cvar `AbilitySystem.ServerRPCBatching.Log 1` to enable special ability batching logging.

This mechanism can only be done in C++ and can only activate abilities by their `FGameplayAbilitySpecHandle`.

```c++
bool UGSAbilitySystemComponent::BatchRPCTryActivateAbility(FGameplayAbilitySpecHandle InAbilityHandle, bool EndAbilityImmediately)
{
	bool AbilityActivated = false;
	if (InAbilityHandle.IsValid())
	{
		FScopedServerAbilityRPCBatcher GSAbilityRPCBatcher(this, InAbilityHandle);
		AbilityActivated = TryActivateAbility(InAbilityHandle, true);

		if (EndAbilityImmediately)
		{
			FGameplayAbilitySpec* AbilitySpec = FindAbilitySpecFromHandle(InAbilityHandle);
			if (AbilitySpec)
			{
				UGSGameplayAbility* GSAbility = Cast<UGSGameplayAbility>(AbilitySpec->GetPrimaryInstance());
				GSAbility->ExternalEndAbility();
			}
		}

		return AbilityActivated;
	}

	return AbilityActivated;
}
```

GASShooter reuses the same batched `GameplayAbility` for semi-automatic and full-automatic guns which never directly call `EndAbility()` (it is handled outside of the ability by a local-only ability that manages player input and the call to the batched ability based on the current firemode). Since all of the RPCs must happen within the scope of the `FScopedServerAbilityRPCBatcher`, I provide the `EndAbilityImmediately` parameter so that the controlling/managing local-only can specify whether this ability should batch the `EndAbility()` call (semi-automatic), or not batch the `EndAbility()` call (full-automatic) and the `EndAbility()` call will happen sometime later in its own RPC.

GASShooter exposes a Blueprint node to allow batching abilities which the aforementioned local-only ability uses to trigger the batched ability.

![Activate Batched Ability](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/batchabilityactivate.png)

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-ga-netsecuritypolicy"></a>
#### 4.6.16 Net Security Policy
A `GameplayAbility`'s `NetSecurityPolicy` determines where should an ability execute on the network. It provides protection from clients attempting to execute restricted abilities.

| `NetSecurityPolicy`     | Description                                                                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ClientOrServer`        | No security requirements. Client or server can trigger execution and termination of this ability freely.                                           |
| `ServerOnlyExecution`   | A client requesting execution of this ability will be ignored by the server. Clients can still request that the server cancel or end this ability. |
| `ServerOnlyTermination` | A client requesting cancellation or ending of this ability will be ignored by the server. Clients can still request execution of the ability.      |
| `ServerOnly`            | Server controls both execution and termination of this ability. A client making any requests will be ignored.                                      |

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-at"></a>
### 4.7 Ability Tasks

<a name="concepts-at-definition"></a>
### 4.7.1 Ability Task Definition
`GameplayAbilities` only execute in one frame. This does not allow for much flexibility on its own. To do actions that happen over time or require responding to delegates fired at some point later in time we use latent actions called `AbilityTasks`.

GAS comes with many `AbilityTasks` out of the box:
* Tasks for moving Characters with `RootMotionSource`
* A task for playing animation montages
* Tasks for responding to `Attribute` changes
* Tasks for responding to `GameplayEffect` changes
* Tasks for responding to player input
* and more

The `UAbilityTask` constructor enforces a hardcoded game-wide maximum of 1000 concurrent `AbilityTasks` running at the same time. Keep this in mind when designing `GameplayAbilities` for games that can have hundreds of characters in the world at the same time like RTS games.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-at-definition"></a>
### 4.7.2 Custom Ability Tasks
Often you will be creating your own custom `AbilityTasks` (in C++). The Sample Project comes with two custom `AbilityTasks`:
1. `PlayMontageAndWaitForEvent` is a combination of the default `PlayMontageAndWait` and `WaitGameplayEvent` `AbilityTasks`. This allows animation montages to send gameplay events from `AnimNotifies` back to the `GameplayAbility` that started them. Use this to trigger actions at specific times during animation montages.
1. `WaitReceiveDamage` listens for the `OwnerActor` to receive damage. The passive armor stacks `GameplayAbility` removes a stack of armor when the hero receives an instance of damage.

`AbilityTasks` are composed of:
* A static function that creates new instances of the `AbilityTask`
* Delegates that are broadcasted on when the `AbilityTask` completes its purpose
* An `Activate()` function to start its main job, bind to external delegates, etc.
* An `OnDestroy()` function for cleanup, including external delegates that it bound to
* Callback functions for any external delegates that it bound to
* Member variables and any internal helper functions

**Note:** `AbilityTasks` can only declare one type of output delegate. All of your output delegates must be of this type, regardless if they use the parameters or not. Pass default values for unused delegate parameters.

`AbilityTasks` only run on the Client or Server that is running the owning `GameplayAbility`; however, `AbilityTasks` can be set to run on simulated clients by setting `bSimulatedTask = true;` in the `AbilityTask` constructor, overriding `virtual void InitSimulatedTask(UGameplayTasksComponent& InGameplayTasksComponent);`, and setting any member variables to be replicated. This is only useful in rare situations like movement `AbilityTasks` where you don't want to replicate every movement change but instead simulate the entire movement `AbilityTask`. All of the `RootMotionSource` `AbilityTasks` do this. See `AbilityTask_MoveToLocation.h/.cpp` as an example.

`AbilityTasks` can `Tick` if you set `bTickingTask = true;` in the `AbilityTask` constructor and override `virtual void TickTask(float DeltaTime);`. This is useful when you need to lerp values smoothly across frames. See `AbilityTask_MoveToLocation.h/.cpp` as an example.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-at-using"></a>
### 4.7.3 Using Ability Tasks
To create and activate an `AbilityTask` in C++ (From `GDGA_FireGun.cpp`):
```c++
UGDAT_PlayMontageAndWaitForEvent* Task = UGDAT_PlayMontageAndWaitForEvent::PlayMontageAndWaitForEvent(this, NAME_None, MontageToPlay, FGameplayTagContainer(), 1.0f, NAME_None, false, 1.0f);
Task->OnBlendOut.AddDynamic(this, &UGDGA_FireGun::OnCompleted);
Task->OnCompleted.AddDynamic(this, &UGDGA_FireGun::OnCompleted);
Task->OnInterrupted.AddDynamic(this, &UGDGA_FireGun::OnCancelled);
Task->OnCancelled.AddDynamic(this, &UGDGA_FireGun::OnCancelled);
Task->EventReceived.AddDynamic(this, &UGDGA_FireGun::EventReceived);
Task->ReadyForActivation();
```

In Blueprint, we just use the Blueprint node that we create for the `AbilityTask`. We don't have to call `ReadyForActivation()`. That is automatically called by `Engine/Source/Editor/GameplayTasksEditor/Private/K2Node_LatentGameplayTaskCall.cpp`. `K2Node_LatentGameplayTaskCall` also automatically calls `BeginSpawningActor()` and `FinishSpawningActor()` if they exist in your `AbilityTask` class (see `AbilityTask_WaitTargetData`). To reiterate, `K2Node_LatentGameplayTaskCall` only does automagic sorcery for Blueprint. In C++, we have to manually call `ReadyForActivation()`, `BeginSpawningActor()`, and `FinishSpawningActor()`.

![Blueprint WaitTargetData AbilityTask](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/abilitytask.png)

To manually cancel an `AbilityTask`, just call `EndTask()` on the `AbilityTask` object in Blueprint (called `Async Task Proxy`) or in C++.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-at-rms"></a>
### 4.7.4 Root Motion Source Ability Tasks
GAS comes with `AbilityTasks` for moving `Characters` over time for things like knockbacks, complex jumps, pulls, and dashes using `Root Motion Sources` hooked into the `CharacterMovementComponent`.

**Note:** Predicting `RootMotionSource` `AbilityTasks` works up to engine version 4.19 and 4.25+. Prediction is bugged for engine versions 4.20-4.24; however, the `AbilityTasks` still perform their function in multiplayer with minor net corrections and work perfectly in single player. It is possible to cherry pick the [prediction fix](https://github.com/EpicGames/UnrealEngine/commit/94107438dd9f490e7b743f8e13da46927051bf33#diff-65f6196f9f28f560f95bd578e07e290c) from 4.25 into a custom 4.20-4.24 engine.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-gc"></a>
### 4.8 Gameplay Cues

<a name="concepts-gc-definition"></a>
#### 4.8.1 Gameplay Cue Definition
`GameplayCues` (`GC`) execute non-gameplay related things like sound effects, particle effects, camera shakes, etc. `GameplayCues` are typically replicated (unless explicitly `Executed`, `Added`, or `Removed` locally) and predicted.

We trigger `GameplayCues` by sending a corresponding `GameplayTag` with the **mandatory parent name of `GameplayCue.`** and an event type (`Execute`, `Add`, or `Remove`) to the `GameplayCueManager` via the `ASC`. `GameplayCueNotify` objects and other `Actors` that implement the `IGameplayCueInterface` can subscribe to these events based on the `GameplayCue's` `GameplayTag` (`GameplayCueTag`).

**Note:** Just to reiterate, `GameplayCue` `GameplayTags` need to start with the parent `GameplayTag` of `GameplayCue`. So for example, a valid `GameplayCue` `GameplayTag` might be `GameplayCue.A.B.C`.

There are two classes of `GameplayCueNotifies`, `Static` and `Actor`. They respond to different events and different types of `GameplayEffects` can trigger them. Override the corresponding event with your logic.

| `GameplayCue` Class                                                                                                                  | Event             | `GameplayEffect` Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`GameplayCueNotify_Static`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/UGameplayCueNotify_Static/index.html) | `Execute`         | `Instant` or `Periodic`  | Static `GameplayCueNotifies` operate on the `ClassDefaultObject` (meaning no instances) and are perfect for one-off effects like hit impacts.                                                                                                                                                                                                                                                                                                                                                                        |
| [`GameplayCueNotify_Actor`](https://docs.unrealengine.com/en-US/BlueprintAPI/GameplayCueNotify/index.html)                           | `Add` or `Remove` | `Duration` or `Infinite` | Actor `GameplayCueNotifies` spawn a new instance when `Added`. Because these are instanced, they can do actions over time until they are `Removed`. These are good for looping sounds and particle effects that will be removed when the backing `Duration` or `Infinite` `GameplayEffect` is removed or by manually calling remove. These also come with options to manage how many are allowed to be `Added` at the same time so that multiple applications of the same effect only start the sounds or particles once. |

`GameplayCueNotifies` technically can respond to any of the events but this is typically how we use them.

**Note:** When using `GameplayCueNotify_Actor`, check `Auto Destroy on Remove` otherwise subsequent calls to `Add` that `GameplayCueTag` won't work.

When using an `ASC` [Replication Mode](#concepts-asc-rm) other than `Full`, `Add` and `Remove` `GC` events will fire twice on Server players (listen server) - once for applying the `GE` and again from the "Minimal" `NetMultiCast` to the clients. However, `WhileActive` events will still only fire once. All events will only fire once on clients.

The Sample Project includes a `GameplayCueNotify_Actor` for stun and sprint effects. It also has a `GameplayCueNotify_Static` for the FireGun's projectile impact. These `GCs` can be optimized further by [triggering them locally](#concepts-gc-local) instead of replicating them through a `GE`. I opted for showing the beginner way of using them in the Sample Project.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-gc-trigger"></a>
#### 4.8.2 Triggering Gameplay Cues

From inside of a `GameplayEffect` when it is successfully applied (not blocked by tags or immunity), fill in the `GameplayTags` of all the `GameplayCues` that should be triggered.

![GameplayCue Triggered from a GameplayEffect](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/gcfromge.png)

`UGameplayAbility` offers Blueprint nodes to `Execute`, `Add`, or `Remove` `GameplayCues`.

![GameplayCue Triggered from a GameplayAbility](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/gcfromga.png)

In C++, you can call functions directly on the `ASC` (or expose them to Blueprint in your `ASC` subclass):

```c++
/** GameplayCues can also come on their own. These take an optional effect context to pass through hit result, etc */
void ExecuteGameplayCue(const FGameplayTag GameplayCueTag, FGameplayEffectContextHandle EffectContext = FGameplayEffectContextHandle());
void ExecuteGameplayCue(const FGameplayTag GameplayCueTag, const FGameplayCueParameters& GameplayCueParameters);

/** Add a persistent gameplay cue */
void AddGameplayCue(const FGameplayTag GameplayCueTag, FGameplayEffectContextHandle EffectContext = FGameplayEffectContextHandle());
void AddGameplayCue(const FGameplayTag GameplayCueTag, const FGameplayCueParameters& GameplayCueParameters);

/** Remove a persistent gameplay cue */
void RemoveGameplayCue(const FGameplayTag GameplayCueTag);
	
/** Removes any GameplayCue added on its own, i.e. not as part of a GameplayEffect. */
void RemoveAllGameplayCues();
```

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-gc-local"></a>
#### 4.8.3 Local Gameplay Cues
The exposed functions for firing `GameplayCues` from `GameplayAbilities` and the `ASC` are replicated by default. Each `GameplayCue` event is a multicast RPC. This can cause a lot of RPCs. GAS also enforces a maximum of two of the same `GameplayCue` RPCs per net update. We avoid this by using local `GameplayCues` where we can. Local `GameplayCues` only `Execute`, `Add`, or `Remove` on the individual client.

Scenarios where we can use local `GameplayCues`:
* Projectile impacts
* Melee collision impacts
* `GameplayCues` fired from animation montages

Local `GameplayCue` functions that you should add to your `ASC` subclass:

```c++
UFUNCTION(BlueprintCallable, Category = "GameplayCue", Meta = (AutoCreateRefTerm = "GameplayCueParameters", GameplayTagFilter = "GameplayCue"))
void ExecuteGameplayCueLocal(const FGameplayTag GameplayCueTag, const FGameplayCueParameters& GameplayCueParameters);

UFUNCTION(BlueprintCallable, Category = "GameplayCue", Meta = (AutoCreateRefTerm = "GameplayCueParameters", GameplayTagFilter = "GameplayCue"))
void AddGameplayCueLocal(const FGameplayTag GameplayCueTag, const FGameplayCueParameters& GameplayCueParameters);

UFUNCTION(BlueprintCallable, Category = "GameplayCue", Meta = (AutoCreateRefTerm = "GameplayCueParameters", GameplayTagFilter = "GameplayCue"))
void RemoveGameplayCueLocal(const FGameplayTag GameplayCueTag, const FGameplayCueParameters& GameplayCueParameters);
```

```c++
void UPAAbilitySystemComponent::ExecuteGameplayCueLocal(const FGameplayTag GameplayCueTag, const FGameplayCueParameters & GameplayCueParameters)
{
	UAbilitySystemGlobals::Get().GetGameplayCueManager()->HandleGameplayCue(GetOwner(), GameplayCueTag, EGameplayCueEvent::Type::Executed, GameplayCueParameters);
}

void UPAAbilitySystemComponent::AddGameplayCueLocal(const FGameplayTag GameplayCueTag, const FGameplayCueParameters & GameplayCueParameters)
{
	UAbilitySystemGlobals::Get().GetGameplayCueManager()->HandleGameplayCue(GetOwner(), GameplayCueTag, EGameplayCueEvent::Type::OnActive, GameplayCueParameters);
	UAbilitySystemGlobals::Get().GetGameplayCueManager()->HandleGameplayCue(GetOwner(), GameplayCueTag, EGameplayCueEvent::Type::WhileActive, GameplayCueParameters);
}

void UPAAbilitySystemComponent::RemoveGameplayCueLocal(const FGameplayTag GameplayCueTag, const FGameplayCueParameters & GameplayCueParameters)
{
	UAbilitySystemGlobals::Get().GetGameplayCueManager()->HandleGameplayCue(GetOwner(), GameplayCueTag, EGameplayCueEvent::Type::Removed, GameplayCueParameters);
}
```

If a `GameplayCue` was `Added` locally, it should be `Removed` locally. If it was `Added` via replication, it should be `Removed` via replication.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-gc-parameters"></a>
#### 4.8.4 Gameplay Cue Parameters
`GameplayCues` receive a `FGameplayCueParameters` structure containing extra information for the `GameplayCue` as a parameter. If you manually trigger the `GameplayCue` from a function on the `GameplayAbility` or the `ASC`, then you must manually fill in the `GameplayCueParameters` structure that is passed to the `GameplayCue`. If the `GameplayCue` is triggered by a `GameplayEffect`, then the following variables are automatically filled in on the `GameplayCueParameters` structure:

* AggregatedSourceTags
* AggregatedTargetTags
* GameplayEffectLevel
* AbilityLevel
* [EffectContext](#concepts-ge-context)
* Magnitude (if the `GameplayEffect` has an `Attribute` for magnitude selected in the dropdown above the `GameplayCue` tag container and a corresponding `Modifier` that affects that `Attribute`)

The `SourceObject` variable in the `GameplayCueParameters` structure is potentially a good place to pass arbitrary data to the `GameplayCue` when triggering the `GameplayCue` manually.

**Note:** Some of the variables in the parameters structure like `Instigator` might already exist in the `EffectContext`. The `EffectContext` can also contain a `FHitResult` for location of where to spawn the `GameplayCue` in the world. Subclassing `EffectContext` is potentially a good way to pass more data to `GameplayCues`, especially those triggered by a `GameplayEffect`.

See the 3 functions in [`UAbilitySystemGlobals`](#concepts-asg) that populate the `GameplayCueParameters` structure for more information. They are virtual so you can override them to autopopulate more information.

```c++
/** Initialize GameplayCue Parameters */
virtual void InitGameplayCueParameters(FGameplayCueParameters& CueParameters, const FGameplayEffectSpecForRPC &Spec);
virtual void InitGameplayCueParameters_GESpec(FGameplayCueParameters& CueParameters, const FGameplayEffectSpec &Spec);
virtual void InitGameplayCueParameters(FGameplayCueParameters& CueParameters, const FGameplayEffectContextHandle& EffectContext);
```

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-gc-manager"></a>
#### 4.8.5 Gameplay Cue Manager
By default, the `GameplayCueManager` will scan the entire game directory for `GameplayCueNotifies` and load them into memory on play. We can change the path where the `GameplayCueManager` scans by setting it in the `DefaultGame.ini`.

```
[/Script/GameplayAbilities.AbilitySystemGlobals]
GameplayCueNotifyPaths="/Game/GASDocumentation/Characters"
```

We do want the `GameplayCueManager` to scan and find all of the `GameplayCueNotifies`; however, we don't want it to async load every single one on play. This will put every `GameplayCueNotify` and all of their referenced sounds and particles into memory regardless if they're even used in a level. In a large game like Paragon, this can be hundreds of megabytes of unneeded assets in memory and cause hitching and game freezes on startup.

An alternative to async loading every `GameplayCue` on startup is to only async load `GameplayCues` as they're triggered in-game. This mitigates the unnecessary memory usage and potential game hard freezes while async loading every `GameplayCue` in exchange for potentially delayed effects for the first time that a specific `GameplayCue` is triggered during play. This potential delay is nonexistent for SSDs. I have not tested on a HDD. If using this option in the UE Editor, there may be slight hitches or freezes during the first load of GameplayCues if the Editor needs to compile particle systems. This is not an issue in builds as the particle systems will already be compiled.

First we must subclass `UGameplayCueManager` and tell the `AbilitySystemGlobals` class to use our `UGameplayCueManager` subclass in `DefaultGame.ini`.

```
[/Script/GameplayAbilities.AbilitySystemGlobals]
GlobalGameplayCueManagerClass="/Script/ParagonAssets.PBGameplayCueManager"
```

In our `UGameplayCueManager` subclass, override `ShouldAsyncLoadRuntimeObjectLibraries()`.

```c++
virtual bool ShouldAsyncLoadRuntimeObjectLibraries() const override
{
	return false;
}
```

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-gc-prevention"></a>
#### 4.8.6 Prevent Gameplay Cues from Firing
Sometimes we don't want `GameplayCues` to fire. For example if we block an attack, we may not want to play the hit impact attached to the damage `GameplayEffect` or play a custom one instead. We can do this inside of [`GameplayEffectExecutionCalculations`](#concepts-ge-ec) by calling `OutExecutionOutput.MarkGameplayCuesHandledManually()` and then manually sending our `GameplayCue` event to the `Target` or `Source's` `ASC`.

If you never want any `GameplayCues` to fire on a specific `ASC`, you can set `AbilitySystemComponent->bSuppressGameplayCues = true;`.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-gc-batching"></a>
#### 4.8.7 Gameplay Cue Batching
Each `GameplayCue` triggered is an unreliable NetMulticast RPC. In situations where we fire multiple `GCs` at the same time, there are a few optimization methods to condense them down into one RPC or save bandwidth by sending less data.

<a name="concepts-gc-batching-manualrpc"></a>
##### 4.8.7.1 Manual RPC
Say you have a shotgun that shoots eight pellets. That's eight trace and impact `GameplayCues`. [GASShooter](https://github.com/tranek/GASShooter) takes the lazy approach of combining them into one RPC by stashing all of the trace information into the [`EffectContext`](#concepts-ge-ec) as [`TargetData`](#concepts-targeting-data). While this reduces the RPCs from eight to one, it still sends a lot of data over the network in that one RPC (~500 bytes). A more optimized approach is to send an RPC with a custom struct where you efficiently encode the hit locations or maybe you give it a random seed number to recreate/approximate the impact locations on the receiving side. The clients would then unpack this custom struct and turn back into [locally executed `GameplayCues`](#concepts-gc-local).

How this works:
1. Declare a `FScopedGameplayCueSendContext`. This suppresses `UGameplayCueManager::FlushPendingCues()` until it falls out of scope, meaning all `GameplayCues` will be queued up until the `FScopedGameplayCueSendContext` falls out of scope.
1. Override `UGameplayCueManager::FlushPendingCues()` to merge `GameplayCues` that can be batched together based on some custom `GameplayTag` into your custom struct and RPC it to clients.
1. Clients receive the custom struct and unpack it into locally executed `GameplayCues`.

This method can also be used when you need specific parameters for your `GameplayCues` that don't fit with what `GameplayCueParameters` offer and you don't want to add them to the `EffectContext` like damage numbers, crit indicator, broken shield indicator, was fatal hit indicator, etc.

https://forums.unrealengine.com/development-discussion/c-gameplay-programming/1711546-fscopedgameplaycuesendcontext-gameplaycuemanager

<a name="concepts-gc-batching-gcsonge"></a>
##### 4.8.7.2 Multiple GCs on one GE
All of the `GameplayCues` on a `GameplayEffect` are sent in one RPC already. By default, `UGameplayCueManager::InvokeGameplayCueAddedAndWhileActive_FromSpec()` will send the whole `GameplayEffectSpec` (but converted to `FGameplayEffectSpecForRPC`) in the unreliable NetMulticast regardless of the `ASC`'s `Replication Mode`. This could potentially be a lot of bandwidth depending on what is in the `GameplayEffectSpec`. We can potentially optimize this by setting the cvar `AbilitySystem.AlwaysConvertGESpecToGCParams 1`. This will convert `GameplayEffectSpecs` to `FGameplayCueParameter` structures and RPC those instead of the whole `FGameplayEffectSpecForRPC`. This potentially saves bandwidth but also has less information, depending on how the `GESpec` is converted to `GameplayCueParameters` and what your `GCs` need to know.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-gc-events"></a>
#### 4.8.8 Gameplay Cue Events
`GameplayCues` respond to specific `EGameplayCueEvents`:

| `EGameplayCueEvent` | Description                                                                                                                                                                                                                                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OnActive`          | Called when a `GameplayCue` is activated (added).                                                                                                                                                                                                                                                                                   |
| `WhileActive`       | Called when `GameplayCue` is active, even if it wasn't actually just applied (Join in progress, etc). This is not `Tick`! It's called once just like `OnActive` when a `GameplayCueNotify_Actor` is added or becomes relevant. If you need `Tick()`, just use the `GameplayCueNotify_Actor`'s `Tick()`. It's an `AActor` after all. |
| `Removed`           | Called when a `GameplayCue` is removed. The Blueprint `GameplayCue` function that responds to this event is `OnRemove`.                                                                                                                                                                                                             |
| `Executed`          | Called when a `GameplayCue` is executed: instant effects or periodic `Tick()`. The Blueprint `GameplayCue` function that responds to this event is `OnExecute`.                                                                                                                                                                     |

Use `OnActive` for anything in your `GameplayCue` that happen at the start of the `GameplayCue` but is okay if late joiners miss. Use `WhileActive` for ongoing effects in the `GameplayCue` that you would want late joiners to see. For example, if you have a `GameplayCue` for a tower structure in a MOBA exploding, you would put the initial explosion particle system and explosion sound in `OnActive` and you would put any residual ongoing fire particles or sounds in the `WhileActive`. In this scenario, it wouldn't make sense for late joiners to replay the initial explosion from `OnActive`, but you would want them to see the persistent, looping fire effects on the ground after the explosion happened from `WhileActive`. `OnRemove` should clean up anything added in `OnActive` and `WhileActive`. `WhileActive` will be called every time an Actor enters the relevancy range of a `GameplayCueNotify_Actor`. `OnRemove` will be called every time an Actor leaves relevancy range of a `GameplayCueNotify_Actor`.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-gc-reliability"></a>
#### 4.8.9 Gameplay Cue Reliability

`GameplayCues` in general should be considered unreliable and thus unsuited for anything that directly affects gameplay.

**Executed `GameplayCues`:** These `GameplayCues` are applied via unreliable multicasts and are always unreliable.

**`GameplayCues` applied from `GameplayEffects`:**
* Autonomous proxy reliably receives `OnActive`, `WhileActive`, and `OnRemove`  
`FActiveGameplayEffectsContainer::NetDeltaSerialize()` calls `UAbilitySystemComponent::HandleDeferredGameplayCues()` to call `OnActive` and `WhileActive`. `FActiveGameplayEffectsContainer::RemoveActiveGameplayEffectGrantedTagsAndModifiers()` makes the call to `OnRemoved`.
* Simulated proxies reliably receive `WhileActive` and `OnRemove`  
`UAbilitySystemComponent::MinimalReplicationGameplayCues`'s replication calls `WhileActive` and `OnRemove`. The `OnActive` event is called by an unreliable multicast.

**`GameplayCues` applied without a `GameplayEffect`:**
* Autonomous proxy reliably receives `OnRemove`  
The `OnActive` and `WhileActive` events are called by an unreliable multicast.
* Simulated proxies reliably receive `WhileActive` and `OnRemove`  
`UAbilitySystemComponent::MinimalReplicationGameplayCues`'s replication calls `WhileActive` and `OnRemove`. The `OnActive` event is called by an unreliable multicast.

If you need something in a `GameplayCue` to be 'reliable', then apply it from a `GameplayEffect` and use `WhileActive` to add the FX and `OnRemove` to remove the FX.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-asg"></a>
### 4.9 Ability System Globals
The [`AbilitySystemGlobals`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/UAbilitySystemGlobals/index.html) class holds global information about GAS. Most of the variables can be set from the `DefaultGame.ini`. Generally you won't have to interact with this class, but you should be aware of its existence. If you need to subclass things like the [`GameplayCueManager`](#concepts-gc-manager) or the [`GameplayEffectContext`](#concepts-ge-context), you have to do that through the `AbilitySystemGlobals`.

To subclass `AbilitySystemGlobals`, set the class name in the `DefaultGame.ini`:
```
[/Script/GameplayAbilities.AbilitySystemGlobals]
AbilitySystemGlobalsClassName="/Script/ParagonAssets.PAAbilitySystemGlobals"
```

<a name="concepts-asg-initglobaldata"></a>
#### 4.9.1 InitGlobalData()
Starting in UE 4.24, it is now necessary to call `UAbilitySystemGlobals::Get().InitGlobalData()` to use [`TargetData`](#concepts-targeting-data), otherwise you will get errors related to `ScriptStructCache` and clients will be disconnected from the server. This function only needs to be called once in a project. Fortnite calls it from `UAssetManager::StartInitialLoading()` and Paragon called it from `UEngine::Init()`. I find that putting it in `UAssetManager::StartInitialLoading()` is a good place as shown in the Sample Project. I would consider this boilerplate code that you should copy into your project to avoid issues with `TargetData`.

If you run into a crash while using the `AbilitySystemGlobals` `GlobalAttributeSetDefaultsTableNames`, you may need to call `UAbilitySystemGlobals::Get().InitGlobalData()` later like Fortnite in the `AssetManager` or in the `GameInstance`.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-p"></a>
### 4.10 Prediction
GAS comes out of the box with support for client-side prediction; however, it does not predict everything. Client-side prediction in GAS means that the client does not have to wait for the server's permission to activate a `GameplayAbility` and apply `GameplayEffects`. It can "predict" the server giving it permission to do this and predict the targets that it would apply `GameplayEffects` to. The server then runs the `GameplayAbility` network latency-time after the client activates and tells the client if he was correct or not in his predictions. If the client was wrong in any of his predictions, he will "roll back" his changes from his "mispredictions" to match the server.

The definitive source for GAS-related prediction is `GameplayPrediction.h` in the plugin source code.

Epic's mindset is to only predict what you "can get away with". For example, Paragon and Fortnite do not predict damage. Most likely they use [`ExecutionCalculations`](#concepts-ge-ec) for their damage which cannot be predicted anyway. This is not to say that you can't try to predict certain things like damage. By all means if you do it and it works well for you then that's great.

> ... we are also not all in on a "predict everything: seamlessly and automatically" solution. We still feel player prediction is best kept to a minimum (meaning: predict the minimum amount of stuff you can get away with).

*Dave Ratti from Epic's comment from the new [Network Prediction Plugin](#concepts-p-npp)*

**What is predicted:**
> * Ability activation
> *	Triggered Events
> *	GameplayEffect application:
>    * Attribute modification (EXCEPTIONS: Executions do not currently predict, only attribute modifiers)
>    * GameplayTag modification
> * Gameplay Cue events (both from within predictive gameplay effect and on their own)
> * Montages
> * Movement (built into UE5 UCharacterMovement)

**What is not predicted:**
> * GameplayEffect removal
> * GameplayEffect periodic effects (dots ticking)

*From `GameplayPrediction.h`*

While we can predict `GameplayEffect` application, we cannot predict `GameplayEffect` removal. One way that we can work around this limitation is to predict the inverse effect when we want to remove a `GameplayEffect`. Say we predict a movement speed slow of 40%. We can predictively remove it by applying a movement speed buff of 40%. Then remove both `GameplayEffects` at the same time. This is not appropriate for every scenario and support for predicting `GameplayEffect` removal is still needed. Dave Ratti from Epic has expressed desire to add it to a [future iteration of GAS](https://epicgames.ent.box.com/s/m1egifkxv3he3u3xezb9hzbgroxyhx89).

Because we cannot predict the removal of `GameplayEffects`, we cannot fully predict `GameplayAbility` cooldowns and there is no inverse `GameplayEffect` workaround for them. The server's replicated `Cooldown GE` will exist on the client and any attempts to bypass this (with `Minimal` replication mode for example) will be rejected by the server. This means clients with higher latencies take longer to tell the server to go on cooldown and to receive the removal of the server's `Cooldown GE`. This means players with higher latencies will have a lower rate of fire than players with lower latencies, giving them a disadvantage against lower latency players. Fortnite avoids this issue by using custom bookkeeping instead of `Cooldown GEs`.

Regarding predicting damage, I personally do not recommend it despite it being one of the first things that most people try when starting with GAS. I especially do not recommend trying to predict death. While you can predict damage, doing so is tricky. If you mispredict applying damage, the player will see the enemy's health jump back up. This can be especially awkward and frustrating if you try to predict death. Say you mispredict a `Character's` death and it starts ragdolling only to stop ragdolling and continue shooting at you when the server corrects it.

**Note:** `Instant`	`GameplayEffects` (like `Cost GEs`) that change `Attributes` can be predicted on yourself seamlessly, predicting `Instant` `Attribute` changes to other characters will show a brief anomaly or "blip" in their `Attributes`. Predicted `Instant` `GameplayEffects` are actually treated like `Infinite` `GameplayEffects` so that they can be rolled back if mispredicted. When the server's `GameplayEffect` is applied, there potentially exists two of the same `GameplayEffect's` causing the `Modifier` to be applied twice or not at all for a brief moment. It will eventually correct itself but sometimes the blip is noticeable to players.

Problems that GAS's prediction implementation is trying to solve:
> 1. "Can I do this?" Basic protocol for prediction.
> 2. "Undo" How to undo side effects when a prediction fails.
> 3. "Redo" How to avoid replaying side effects that we predicted locally but that also get replicated from the server.
> 4. "Completeness" How to be sure we /really/ predicted all side effects.
> 5. "Dependencies" How to manage dependent prediction and chains of predicted events.
> 6. "Override" How to override state predictively that is otherwise replicated/owned by the server.

*From `GameplayPrediction.h`*

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-p-key"></a>
#### 4.10.1 Prediction Key
GAS's prediction works on the concept of a `Prediction Key` which is an integer identifier that the client generates when he activates a `GameplayAbility`.

* Client generates a prediction key when it activates a `GameplayAbility`. This is the `Activation Prediction Key`.
* Client sends this prediction key to the server with `CallServerTryActivateAbility()`.
* Client adds this prediction key to all `GameplayEffects` that it applies while the prediction key is valid.
* Client's prediction key falls out of scope. Further predicted effects in the same `GameplayAbility` need a new [Scoped Prediction Window](#concepts-p-windows).


* Server receives the prediction key from the client.
* Server adds this prediction key to all `GameplayEffects` that it applies.
* Server replicates the prediction key back to the client.


* Client receives replicated `GameplayEffects` from the server with the prediction key used to apply them. If any of the replicated `GameplayEffects` match the `GameplayEffects` that the client applied with the same prediction key, they were predicted correctly. There will temporarily be two copies of the `GameplayEffect` on the target until the client removes its predicted one.
* Client receives the prediction key back from the server. This is the `Replicated Prediction Key`. This prediction key is now marked stale.
* Client removes **all** `GameplayEffects` that it created with the now stale replicated prediction key. `GameplayEffects` replicated by the server will persist. Any `GameplayEffects` that the client added and didn't receive a matching replicated version from the server were mispredicted.

Prediction keys are guaranteed to be valid during an atomic grouping of instructions "window" in `GameplayAbilities` starting with `Activation` from the activation prediction key. You can think of this as being only valid during one frame. Any callbacks from latent action `AbilityTasks` will no longer have a valid prediction key unless the `AbilityTask` has a built-in Synch Point which generates a new [Scoped Prediction Window](#concepts-p-windows).

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-p-windows"></a>
#### 4.10.2 Creating New Prediction Windows in Abilities
To predict more actions in callbacks from `AbilityTasks`, we need to create a new Scoped Prediction Window with a new Scoped Prediction Key. This is sometimes referred to as a Synch Point between the client and server. Some `AbilityTasks` like all of the input related ones come with built-in functionality to create a new scoped prediction window, meaning atomic code in the `AbilityTasks'` callbacks have a valid scoped prediction key to use. Other tasks like the `WaitDelay` task do not have built-in code to create a new scoped prediction window for its callback. If you need to predict actions after an `AbilityTask` that does not have built-in code to create a scoped prediction window like `WaitDelay`, we must manually do that using the `WaitNetSync` `AbilityTask` with the option `OnlyServerWait`. When the client hits a `WaitNetSync` with `OnlyServerWait`, it generates a new scoped prediction key based on the `GameplayAbility's` activation prediction key, RPCs it to the server, and adds it to any new `GameplayEffects` that it applies. When the server hits a `WaitNetSync` with `OnlyServerWait`, it waits until it receives the new scoped prediction key from the client before continuing. This scoped prediction key does the same dance as activation prediction keys - applied to `GameplayEffects` and replicated back to clients to be marked stale. The scoped prediction key is valid until it falls out of scope, meaning the scoped prediction window has closed. So again, only atomic operations, nothing latent, can use the new scoped prediction key.

You can create as many scoped prediction windows as you need.

If you would like to add the synch point functionality to your own custom `AbilityTasks`, look at how the input ones essentially inject the `WaitNetSync` `AbilityTask` code into them.

**Note:** When using `WaitNetSync`, this does block the server's `GameplayAbility` from continuing execution until it hears from the client. This could potentially be abused by malicious users who hack the game and intentionally delay sending their new scoped prediction key. While Epic uses the `WaitNetSync` sparingly, it recommends potentially building a new version of the `AbilityTask` with a delay that automatically continues without the client if this is a concern for you.

The Sample Project uses `WaitNetSync` in the Sprint `GameplayAbility` to create a new scoped prediction window every time we apply the stamina cost so that we can predict it. Ideally we want a valid prediction key when applying costs and cooldowns.

If you have a predicted `GameplayEffect` that is playing twice on the owning client, your prediction key is stale and you're experiencing the "redo" problem. You can usually solve this by putting a `WaitNetSync` `AbilityTask` with `OnlyServerWait` right before you apply the `GameplayEffect` to create a new scoped prediction key.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-p-spawn"></a>
#### 4.10.3 Predictively Spawning Actors
Spawning `Actors` predictively on clients is an advanced topic. GAS does not provide functionality to handle this out of the box (the `SpawnActor` `AbilityTask` only spawns the `Actor` on the server). The key concept is to spawn a replicated `Actor` on both the client and the server.

If the `Actor` is just cosmetic or doesn't serve any gameplay purpose, the simple solution is to override the `Actor's` `IsNetRelevantFor()` function to restrict the server from replicating to the owning client. The owning client would have his locally spawned version and the server and other clients would have the server's replicated version.
```c++
bool APAReplicatedActorExceptOwner::IsNetRelevantFor(const AActor * RealViewer, const AActor * ViewTarget, const FVector & SrcLocation) const
{
	return !IsOwnedBy(ViewTarget);
}
```

If the spawned `Actor` affects gameplay like a projectile that needs to predict damage, then you need advanced logic that is outside of the scope of this documentation. Look at how UnrealTournament predictively spawns projectiles on Epic Games' GitHub. They have a dummy projectile spawned only on the owning client that synchs up with the server's replicated projectile.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-p-future"></a>
#### 4.10.4 Future of Prediction in GAS
`GameplayPrediction.h` states in the future they could potentially add functionality for predicting `GameplayEffect` removal and periodic `GameplayEffects`.

Dave Ratti from Epic has [expressed interest](https://epicgames.ent.box.com/s/m1egifkxv3he3u3xezb9hzbgroxyhx89) in fixing the `latency reconciliation` problem for predicting cooldowns, disadvantaging players with higher latencies versus players with lower latencies.

The new [`Network Prediction` plugin](#concepts-p-npp) by Epic is expected to be fully interoperable with the GAS like the `CharacterMovementComponent` *was* before it.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-p-npp"></a>
#### 4.10.5 Network Prediction Plugin
Epic recently started an initiative to replace the `CharacterMovementComponent` with a new `Network Prediction` plugin. This plugin is still in its very early stages but is available to very early access on the Unreal Engine GitHub. It's too soon to tell which future version of the Engine that it will make its experimental beta debut in.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-targeting"></a>
### 4.11 Targeting

<a name="concepts-targeting-data"></a>
#### 4.11.1 Target Data
[`FGameplayAbilityTargetData`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/Abilities/FGameplayAbilityTargetData/index.html) is a generic structure for targeting data meant to be passed across the network. `TargetData` will typically hold `AActor`/`UObject` references, `FHitResults`, and other generic location/direction/origin information. However, you can subclass it to put essentially anything that you want inside of them as a simple means to [pass data between the client and server in `GameplayAbilities`](#concepts-ga-data). The base struct `FGameplayAbilityTargetData` is not meant to be used directly but instead subclassed. `GAS` comes with a few subclassed `FGameplayAbilityTargetData` structs out of the box located in `GameplayAbilityTargetTypes.h`.

`TargetData` is typically produced by [`Target Actors`](#concepts-targeting-actors) or **created manually** and consumed by [`AbilityTasks`](#concepts-at) and [`GameplayEffects`](#concepts-ge) via the [`EffectContext`](#concepts-ge-context). As a result of being in the `EffectContext`, [`Executions`](#concepts-ge-ec), [`MMCs`](#concepts-ge-mmc), [`GameplayCues`](#concepts-gc), and the functions on the backend of the [`AttributeSet`](#concepts-as) can access the `TargetData`.

We don't typically pass around the `FGameplayAbilityTargetData` directly, instead we use a [`FGameplayAbilityTargetDataHandle`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/Abilities/FGameplayAbilityTargetDataHandle/index.html) which has an internal TArray of pointers to `FGameplayAbilityTargetData`. This intermediate struct provides support for polymorphism of the `TargetData`.

An example of inheritting from `FGameplayAbilityTargetData`:
```c++
USTRUCT(BlueprintType)
struct MYGAME_API FGameplayAbilityTargetData_CustomData : public FGameplayAbilityTargetData
{
    GENERATED_BODY()
public:

    FGameplayAbilityTargetData_CustomData()
    { }

    UPROPERTY()
    FName CoolName = NAME_None;

    UPROPERTY()
    FPredictionKey MyCoolPredictionKey;

    // This is required for all child structs of FGameplayAbilityTargetData
    virtual UScriptStruct* GetScriptStruct() const override
    {
    	return FGameplayAbilityTargetData_CustomData::StaticStruct();
    }

	// This is required for all child structs of FGameplayAbilityTargetData
    bool NetSerialize(FArchive& Ar, class UPackageMap* Map, bool& bOutSuccess)
    {
	    // The engine already defined NetSerialize for FName & FPredictionKey, thanks Epic!
        CoolName.NetSerialize(Ar, Map, bOutSuccess);
        MyCoolPredictionKey.NetSerialize(Ar, Map, bOutSuccess);
        bOutSuccess = true;
        return true;
    }
}

template<>
struct TStructOpsTypeTraits<FGameplayAbilityTargetData_CustomData> : public TStructOpsTypeTraitsBase2<FGameplayAbilityTargetData_CustomData>
{
	enum
	{
        WithNetSerializer = true // This is REQUIRED for FGameplayAbilityTargetDataHandle net serialization to work
	};
};
```
For adding the target data to a handle:
```c++
UFUNCTION(BlueprintPure)
FGameplayAbilityTargetDataHandle MakeTargetDataFromCustomName(const FName CustomName)
{
	// Create our target data type, 
	// Handle's automatically cleanup and delete this data when the handle is destructed, 
	// if you don't add this to a handle then be careful because this deals with memory management and memory leaks so its safe to just always add it to a handle at some point in the frame!
	FGameplayAbilityTargetData_CustomData* MyCustomData = new FGameplayAbilityTargetData_CustomData();
	// Setup the struct's information to use the inputted name and any other changes we may want to do
	MyCustomData->CoolName = CustomName;
	
	// Make our handle wrapper for Blueprint usage
	FGameplayAbilityTargetDataHandle Handle;
	// Add the target data to our handle
	Handle.Add(MyCustomData);
	// Output our handle to Blueprint
	return Handle
}
```

For getting values it requires doing type safety checking, because the only way to get values from the handle's target data is by using generic C/C++ casting for it which is *NOT* type safe which can cause object slicing and crashes. For type checking there are multiple ways of doing this(however you want honestly) two common ways are:
- Gameplay Tag(s): You can use a subclass hierarchy where you know that anytime a certain code architecture's functionality occurs, you can cast for the base parent type and get its gameplay tag(s) and then compare against those for casting for inherited classes.
- Script Struct & Static Structs: You can instead do direct class comparison(which can involve a lot of IF statements or making some template functions), below is an example of doing this but basically you can get the script struct from any `FGameplayAbilityTargetData`(this is a nice advantage of it being a `USTRUCT` and requiring any inherited classes to specify the struct type in `GetScriptStruct`) and compare if its the type you're looking for. Below is an example of using these functions for type checking:
```c++
UFUNCTION(BlueprintPure)
FName GetCoolNameFromTargetData(const FGameplayAbilityTargetDataHandle& Handle, const int Index)
{   
    // NOTE, there is two versions of this '::Get(int32 Index)' function; 
    // 1) const version that returns 'const FGameplayAbilityTargetData*', good for reading target data values 
    // 2) non-const version that returns 'FGameplayAbilityTargetData*', good for modifying target data values
    FGameplayAbilityTargetData* Data = Handle.Get(Index); // This will valid check the index for you 
    
    // Valid check we have something to use, null data means nothing to cast for
    if(Data == nullptr)
    {
       	return NAME_None;
    }
    // This is basically the type checking pass, static_cast does not have type safety, this is why we do this check.
    // If we don't do this then it will object slice the struct and thus we have no way of making sure its that type.
    if(Data->GetScriptStruct() == FGameplayAbilityTargetData_CustomData::StaticStruct())
    {
        // Here is when you would do the cast because we know its the correct type already
        FGameplayAbilityTargetData_CustomData* CustomData = static_cast<FGameplayAbilityTargetData_CustomData*>(Data);    
        return CustomData->CoolName;
    }
    return NAME_None;
}
```

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-targeting-actors"></a>
#### 4.11.2 Target Actors
`GameplayAbilities` spawn [`TargetActors`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/Abilities/AGameplayAbilityTargetActor/index.html) with the `WaitTargetData` `AbilityTask` to visualize and capture targeting information from the world. `TargetActors` may optionally use [`GameplayAbilityWorldReticles`](#concepts-targeting-reticles) to display current targets. Upon confirmation, the targeting information is returned as [`TargetData`](#concepts-targeting-data) which can then be passed into `GameplayEffects`.
 
`TargetActors` are based on `AActor` so they can have any kind of visible component to represent **where** and **how** they are targeting such as static meshes or decals. Static meshes may be used to visualize placement of an object that your character will build. Decals may be used to show an area of effect on the ground. The Sample Project uses [`AGameplayAbilityTargetActor_GroundTrace`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/Abilities/AGameplayAbilityTargetActor_Grou-/index.html) with a decal on the ground to represent the damage area of effect for the Meteor ability. They also don't need to display anything either. For example it wouldn't make sense to display anything for a hitscan gun that instantly traces a line to its target as used in [GASShooter](https://github.com/tranek/GASShooter).

They capture targeting information using basic traces or collision overlaps and convert the results as `FHitResults` or `AActor` arrays to `TargetData` depending on the `TargetActor` implementation. The `WaitTargetData` `AbilityTask` determines when the targets are confirmed through its `TEnumAsByte<EGameplayTargetingConfirmation::Type> ConfirmationType` parameter. When **not** using `TEnumAsByte<EGameplayTargetingConfirmation::Type::Instant`, the `TargetActor` typically performs the trace/overlap on `Tick()` and updates its location to the `FHitResult` depending on its implementation. While this performs a trace/overlap on `Tick()`, it's generally not terrible since it's not replicated and you typically don't have more than one (although you could have more) `TargetActor` running at a time. Just be aware that it uses `Tick()` and some complex `TargetActors` might do a lot on it like the rocket launcher's secondary ability in GASShooter. While tracing on `Tick()` is very responsive to the client, you may consider lowering the tick rate on the `TargetActor` if the performance hit is too much. In the case of `TEnumAsByte<EGameplayTargetingConfirmation::Type::Instant`, the `TargetActor` immediately spawns, produces `TargetData`, and destroys. `Tick()` is never called. 

| `EGameplayTargetingConfirmation::Type` | When targets are confirmed                                                                                                                                                                                                                                                                                                                                     |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Instant`                              | The targeting happens instantly without special logic or user input deciding when to 'fire'.                                                                                                                                                                                                                                                                   |
| `UserConfirmed`                        | The targeting happens when the user confirms the targeting when the [ability is bound to a `Confirm` input](#concepts-ga-input) or by calling `UAbilitySystemComponent::TargetConfirm()`. The `TargetActor` will also respond to a bound `Cancel` input or call to `UAbilitySystemComponent::TargetCancel()` to cancel targeting.                              |
| `Custom`                               | The GameplayTargeting Ability is responsible for deciding when the targeting data is ready by calling `UGameplayAbility::ConfirmTaskByInstanceName()`. The `TargetActor` will also respond to `UGameplayAbility::CancelTaskByInstanceName()` to cancel targeting.                                                                                              |
| `CustomMulti`                          | The GameplayTargeting Ability is responsible for deciding when the targeting data is ready by calling `UGameplayAbility::ConfirmTaskByInstanceName()`. The `TargetActor` will also respond to `UGameplayAbility::CancelTaskByInstanceName()` to cancel targeting. Should not end the `AbilityTask` upon data production.                                       |

Not every EGameplayTargetingConfirmation::Type is supported by every `TargetActor`. For example, `AGameplayAbilityTargetActor_GroundTrace` does not support `Instant` confirmation.

The `WaitTargetData` `AbilityTask` takes in a `AGameplayAbilityTargetActor` class as a parameter and will spawn an instance on each activation of the `AbilityTask` and will destroy the `TargetActor` when the `AbilityTask` ends. The `WaitTargetDataUsingActor` `AbilityTask` takes in an already spawned `TargetActor`, but still destroys it when the `AbilityTask` ends. Both of these `AbilityTasks` are inefficient in that they either spawn or require a newly spawned `TargetActor` for each use. They're great for prototyping, but in production you might explore optimizing it if you have cases where you are constantly producing `TargetData` like in the case of an automatic rifle. GASShooter has a custom subclass of [`AGameplayAbilityTargetActor`](https://github.com/tranek/GASShooter/blob/master/Source/GASShooter/Public/Characters/Abilities/GSGATA_Trace.h) and a new [`WaitTargetDataWithReusableActor`](https://github.com/tranek/GASShooter/blob/master/Source/GASShooter/Public/Characters/Abilities/AbilityTasks/GSAT_WaitTargetDataUsingActor.h) `AbilityTask` written from scratch that allows you to reuse a `TargetActor` without destroying it.

`TargetActors` are not replicated by default; however, they can be made to replicate if that makes sense in your game to show other players where the local player is targeting. They do include default functionality to communicate with the server via RPCs on the `WaitTargetData` `AbilityTask`. If the `TargetActor`'s `ShouldProduceTargetDataOnServer` property is set to `false`, then the client will RPC its `TargetData` to the server on confirmation via `CallServerSetReplicatedTargetData()` in `UAbilityTask_WaitTargetData::OnTargetDataReadyCallback()`. If `ShouldProduceTargetDataOnServer` is `true`, the client will send a generic confirm event, `EAbilityGenericReplicatedEvent::GenericConfirm`, RPC to the server in `UAbilityTask_WaitTargetData::OnTargetDataReadyCallback()` and the server will do the trace or overlap check upon receiving the RPC to produce data on the server. If the client cancels the targeting, it will send a generic cancel event, `EAbilityGenericReplicatedEvent::GenericCancel`, RPC to the server in `UAbilityTask_WaitTargetData::OnTargetDataCancelledCallback`. As you can see, there are a lot of delegates on both the `TargetActor` and the `WaitTargetData` `AbilityTask`. The `TargetActor` responds to inputs to produce and broadcast `TargetData` ready, confirm, or cancel delegates. `WaitTargetData` listens to the `TargetActor`'s `TargetData` ready, confirm, and cancel delegates and relays that information back to the `GameplayAbility` and to the server. If you send `TargetData` to the server, you may want to do validation on the server to make sure the `TargetData` looks reasonable to prevent cheating. Producing the `TargetData` directly on the server avoids this issue entirely, but will potentially lead to mispredictions for the owning client.

Depending on the particular subclass of `AGameplayAbilityTargetActor` that you use, different `ExposeOnSpawn` parameters will be exposed on the `WaitTargetData` `AbilityTask` node. Some common parameters include:

| Common `TargetActor` Parameters | Definition                                                                                                                                                                                                                                                                                                               |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Debug                           | If `true`, it will draw debug tracing/overlapping information whenever the `TargetActor` performs a trace in non-shipping builds. Remember, non-`Instant` `TargetActors` will perform a trace on `Tick()` so these debug draw calls will also happen on `Tick()`.                                                        |
| Filter                          | [Optional] A special struct for filtering out (removing) `Actors` from the targets when the trace/overlap happens. Typical use cases are to filter out the player's `Pawn`, require targets be of a specific class. See [Target Data Filters](#concepts-target-data-filters) for more advanced use cases. |
| Reticle Class                   | [Optional] Subclass of `AGameplayAbilityWorldReticle` that the `TargetActor` will spawn.                                                                                                                                                                                                                                 |
| Reticle Parameters              | [Optional] Configure your Reticles. See [Reticles](#concepts-targeting-reticles).                                                                                                                                                                                                                                        |
| Start Location                  | A special struct for where tracing should start from. Typically this will be the player's viewpoint, a weapon muzzle, or the `Pawn`'s location.                                                                                                                                                                          |

With the default `TargetActor` classes, `Actors` are only valid targets when they are directly in the trace/overlap. If they leave the trace/overlap (they move or you look away), they are no longer valid. If you want the `TargetActor` to remember the last valid target(s), you will need to add this functionality to a custom `TargetActor` class. I refer to these as persistent targets as they will persist until the `TargetActor` receives confirmation or cancellation, the `TargetActor` finds a new valid target in its trace/overlap, or the target is no longer valid (destroyed). GASShooter uses persistent targets for its rocket launcher's secondary ability's homing rockets targeting.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-target-data-filters"></a>
#### 4.11.3 Target Data Filters
Using both the `Make GameplayTargetDataFilter` and `Make Filter Handle` nodes, you can filter out the player's `Pawn` or select only a specific class. If you need more advanced filtering, you can subclass `FGameplayTargetDataFilter` and override the `FilterPassesForActor` function. 
```c++
USTRUCT(BlueprintType)
struct GASDOCUMENTATION_API FGDNameTargetDataFilter : public FGameplayTargetDataFilter
{
	GENERATED_BODY()

	/** Returns true if the actor passes the filter and will be targeted */
	virtual bool FilterPassesForActor(const AActor* ActorToBeFiltered) const override;
};
```

However, this will not work directly into the `Wait Target Data` node as it requires a `FGameplayTargetDataFilterHandle`. A new custom `Make Filter Handle` must be made to accept the subclass:
```c++
FGameplayTargetDataFilterHandle UGDTargetDataFilterBlueprintLibrary::MakeGDNameFilterHandle(FGDNameTargetDataFilter Filter, AActor* FilterActor)
{
	FGameplayTargetDataFilter* NewFilter = new FGDNameTargetDataFilter(Filter);
	NewFilter->InitializeFilterContext(FilterActor);

	FGameplayTargetDataFilterHandle FilterHandle;
	FilterHandle.Filter = TSharedPtr<FGameplayTargetDataFilter>(NewFilter);
	return FilterHandle;
}
```

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-targeting-reticles"></a>
#### 4.11.4 Gameplay Ability World Reticles
[`AGameplayAbilityWorldReticles`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/Abilities/AGameplayAbilityWorldReticle/index.html) (`Reticles`) visualize **who** you are targeting when targeting with non-`Instant` confirmed [`TargetActors`](#concepts-targeting-actors). `TargetActors` are responsible for the spawn and destroy lifetimes for all `Reticles`. `Reticles` are `AActors` so they can use any kind of visual component for representation. A common implementation as seen in [GASShooter](https://github.com/tranek/GASShooter) is to use a `WidgetComponent` to display a UMG Widget in screen space (always facing the player's camera). `Reticles` do not know which `AActor` that they're on, but you could subclass in that functionality on a custom `TargetActor`. `TargetActors` will typically update the `Reticle`'s location to the target's location on every `Tick()`.

GASShooter uses `Reticles` to show locked-on targets for the rocket launcher's secondary ability's homing rockets. The red indicator on the enemy is the `Reticle`. The similar white image is the rocket launcher's crosshair.
![Reticles in GASShooter](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/gameplayabilityworldreticle.png)

`Reticles` come with a handful of `BlueprintImplementableEvents` for designers (they're intended to be developed in Blueprints):

```c++
/** Called whenever bIsTargetValid changes value. */
UFUNCTION(BlueprintImplementableEvent, Category = Reticle)
void OnValidTargetChanged(bool bNewValue);

/** Called whenever bIsTargetAnActor changes value. */
UFUNCTION(BlueprintImplementableEvent, Category = Reticle)
void OnTargetingAnActor(bool bNewValue);

UFUNCTION(BlueprintImplementableEvent, Category = Reticle)
void OnParametersInitialized();

UFUNCTION(BlueprintImplementableEvent, Category = Reticle)
void SetReticleMaterialParamFloat(FName ParamName, float value);

UFUNCTION(BlueprintImplementableEvent, Category = Reticle)
void SetReticleMaterialParamVector(FName ParamName, FVector value);
```

`Reticles` can optionally use [`FWorldReticleParameters`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/Abilities/FWorldReticleParameters/index.html) provided by the `TargetActor` for configuration. The default struct only provides one variable `FVector AOEScale`. While you can technically subclass this struct, the `TargetActor` will only accept the base struct. It seems a little short-sighted to not allow this to be subclassed with default `TargetActors`. However, if you make your own custom `TargetActor`, you can provide your own custom reticle parameters struct and manually pass it to your subclass of `AGameplayAbilityWorldReticles` when you spawn them.

`Reticles` are not replicated by default, but can be made replicated if it makes sense for your game to show other players who the local player is targeting.

`Reticles` will only display on the current valid target with the default `TargetActors`. For example, if you're using a `AGameplayAbilityTargetActor_SingleLineTrace` to trace for a target, the `Reticle` will only appear when the enemy is directly in the trace path. If you look away, the enemy is no longer a valid target and the `Reticle` will disappear. If you want the `Reticle` to stay on the last valid target, you will want to customize your `TargetActor` to remember the last valid target and keep the `Reticle` on them. I refer to these as persistent targets as they will persist until the `TargetActor` receives confirmation or cancellation, the `TargetActor` finds a new valid target in its trace/overlap, or the target is no longer valid (destroyed).  GASShooter uses persistent targets for its rocket launcher's secondary ability's homing rockets targeting.

**[⬆ 回到顶部](#table-of-contents)**

<a name="concepts-targeting-containers"></a>
#### 4.11.5 Gameplay Effect Containers Targeting
[`GameplayEffectContainers`](#concepts-ge-containers) come with an optional, efficient means of producing [`TargetData`](#concepts-targeting-data). This targeting takes place instantly when the `EffectContainer` is applied on the client and the server. It's more efficient than [`TargetActors`](#concepts-targeting-actors) because it runs on the CDO of the targeting object (no spawning and destroying of `Actors`), but it lacks player input, happens instantly without needing confirmation, cannot be canceled, and cannot send data from the client to the server (produces data on both). It works well for instant traces and collision overlaps. Epic's [Action RPG Sample Project](https://www.unrealengine.com/marketplace/en-US/product/action-rpg) includes two example types of targeting with its containers - target the ability owner and pull `TargetData` from an event. It also implements one in Blueprint to do instant sphere traces at some offset (set by child Blueprint classes) from the player. You can subclass `URPGTargetType` in C++ or Blueprint to make your own targeting types.

**[⬆ 回到顶部](#table-of-contents)**

<a name="cae"></a>
## 5. Commonly Implemented Abilities and Effects

<a name="cae-stun"></a>
### 5.1 Stun
Typically with stuns, we want to cancel all of a `Character's` active `GameplayAbilities`, prevent new `GameplayAbility` activations, and prevent movement throughout the duration of the stun. The Sample Project's Meteor `GameplayAbility` applies a stun on hit targets.

To cancel the target's active `GameplayAbilities`, we call `AbilitySystemComponent->CancelAbilities()` when the stun [`GameplayTag` is added](#concepts-gt-change).

To prevent new `GameplayAbilities` from activating while stunned, the `GameplayAbilities` are given the stun `GameplayTag` in their [`Activation Blocked Tags` `GameplayTagContainer`](#concepts-ga-tags).

To prevent movement while stunned, we override the `CharacterMovementComponent's` `GetMaxSpeed()` function to return 0 when the owner has the stun `GameplayTag`.

**[⬆ 回到顶部](#table-of-contents)**

<a name="cae-sprint"></a>
### 5.2 Sprint
The Sample Project provides an example of how to sprint - run faster while `Left Shift` is held down.

The faster movement is handled predictively by the `CharacterMovementComponent` by sending a flag over the network to the server. See `GDCharacterMovementComponent.h/cpp` for details.

The `GA` handles responding to the `Left Shift` input, tells the `CMC` to begin and stop sprinting, and to predictively charge stamina while `Left Shift` is pressed. See `GA_Sprint_BP` for details.

**[⬆ 回到顶部](#table-of-contents)**

<a name="cae-ads"></a>
### 5.3 Aim Down Sights
The Sample Project handles this the exact same way as sprinting but decreasing the movement speed instead of increasing it.

See `GDCharacterMovementComponent.h/cpp` for details on predictively decreasing the movement speed.

See `GA_AimDownSight_BP` for details on handling the input. There is no stamina cost for aiming down sights.

**[⬆ 回到顶部](#table-of-contents)**

<a name="cae-ls"></a>
### 5.4 Lifesteal
I handle lifesteal inside of the damage [`ExecutionCalculation`](#concepts-ge-ec). The `GameplayEffect` will have a `GameplayTag` on it like `Effect.CanLifesteal`. The `ExecutionCalculation` checks if the `GameplayEffectSpec` has that `Effect.CanLifesteal` `GameplayTag`. If the `GameplayTag` exists, the `ExecutionCalculation` [creates a dynamic `Instant` `GameplayEffect`](#concepts-ge-dynamic) with the amount of health to give as the modifier and applies it back to the `Source's` `ASC`.

```c++
if (SpecAssetTags.HasTag(FGameplayTag::RequestGameplayTag(FName("Effect.Damage.CanLifesteal"))))
{
	float Lifesteal = Damage * LifestealPercent;

	UGameplayEffect* GELifesteal = NewObject<UGameplayEffect>(GetTransientPackage(), FName(TEXT("Lifesteal")));
	GELifesteal->DurationPolicy = EGameplayEffectDurationType::Instant;

	int32 Idx = GELifesteal->Modifiers.Num();
	GELifesteal->Modifiers.SetNum(Idx + 1);
	FGameplayModifierInfo& Info = GELifesteal->Modifiers[Idx];
	Info.ModifierMagnitude = FScalableFloat(Lifesteal);
	Info.ModifierOp = EGameplayModOp::Additive;
	Info.Attribute = UPAAttributeSetBase::GetHealthAttribute();

	SourceAbilitySystemComponent->ApplyGameplayEffectToSelf(GELifesteal, 1.0f, SourceAbilitySystemComponent->MakeEffectContext());
}
```

**[⬆ 回到顶部](#table-of-contents)**

<a name="cae-random"></a>
### 5.5 Generating a Random Number on Client and Server
Sometimes you need to generate a "random" number inside of a `GameplayAbility` for things like bullet recoil or spread. The client and the server will both want to generate the same random numbers. To do this, we must set the `random seed` to be the same at the time of `GameplayAbility` activation. You will want to set the `random seed` each time you activate the `GameplayAbility` in case the client mispredicts activation and its random number sequence becomes out of synch with the server's.

| Seed Setting Method                                                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Use the activation prediction key                                            | The `GameplayAbility` activation prediction key is an int16 guaranteed to be synchronized and available in both the client and server in the `Activation()`. You can set this as the `random seed` on both the client and the server. The downside to this method is that the prediction key always starts at zero each time the game starts and consistently increments the value to use between generating keys. This means each match will have the exact same random number sequence. This may or may not be random enough for your needs. |
| Send a seed through an event payload when you activate the `GameplayAbility` | Activate your `GameplayAbility` by event and send the randomly generated seed from the client to the server via the replicated event payload. This allows for more randomness but the client could easily hack their game to only send the same seed value every time. Also activating `GameplayAbilities` by event will prevent them from activating from the input bind.                                                                                                                                                                     |

If your random deviation is small, most players won't notice that the sequence is the same every game and using the activation prediction key as the `random seed` should work for you. If you're doing something more complex that needs to be hacker proof, perhaps using a `Server Initiated` `GameplayAbility` would work better where the server can create the prediction key or generate the `random seed` to send via an event payload.

**[⬆ 回到顶部](#table-of-contents)**

<a name="cae-crit"></a>
### 5.6 Critical Hits
I handle critical hits inside of the damage [`ExecutionCalculation`](#concepts-ge-ec). The `GameplayEffect` will have a `GameplayTag` on it like `Effect.CanCrit`. The `ExecutionCalculation` checks if the `GameplayEffectSpec` has that `Effect.CanCrit` `GameplayTag`. If the `GameplayTag` exists, the `ExecutionCalculation` generates a random number corresponding to the critical hit chance (`Attribute` captured from the `Source`) and adds the critical hit damage (also an `Attribute` captured from the `Source`) if it succeeded. Since I don't predict damage, I don't have to worry about synchronizing the random number generators on the client and server since the `ExecutionCalculation` will only run on the server. If you tried to do this predictively using an `MMC` to do your damage calculation, you would have to get a reference to the `random seed` from the `GameplayEffectSpec->GameplayEffectContext->GameplayAbilityInstance`.

See how [GASShooter](https://github.com/tranek/GASShooter) does headshots. It's the same concept except that it does not rely on a random number for chance and instead checks the `FHitResult` bone name.

**[⬆ 回到顶部](#table-of-contents)**

<a name="cae-nonstackingge"></a>
### 5.7 Non-Stacking Gameplay Effects but Only the Greatest Magnitude Actually Affects the Target
Slow effects in Paragon did not stack. Each slow instance applied and kept track of their lifetimes as normal, but only the greatest magnitude slow effect actually affected the `Character`. GAS provides for this scenario out of the box with `AggregatorEvaluateMetaData`. See [`AggregatorEvaluateMetaData()`](#concepts-as-onattributeaggregatorcreated) for details and implementation.

**[⬆ 回到顶部](#table-of-contents)**

<a name="cae-paused"></a>
### 5.8 Generate Target Data While Game is Paused
If you need to pause the game while waiting to generate [`TargetData`](#concepts-targeting-data) from a `WaitTargetData` `AbilityTask` from your player, I suggest instead of pausing to use `slomo 0`.

**[⬆ 回到顶部](#table-of-contents)**

<a name="cae-onebuttoninteractionsystem"></a>
### 5.9 One Button Interaction System
[GASShooter](https://github.com/tranek/GASShooter) implements a one button interaction system where the player can press or hold 'E' to interact with interactable objects like reviving a player, opening a weapon chest, and opening or closing a sliding door.

**[⬆ 回到顶部](#table-of-contents)**

<a name="debugging"></a>
## 6. Debugging GAS
Often when debugging GAS related issues, you want to know things like:
> * "What are the values of my attributes?"
> * "What gameplay tags do I have?"
> * "What gameplay effects do I currently have?"
> * "What abilities do I have granted, which ones are running, and which ones are blocked from activating?".

GAS comes with two techniques for answering these questions at runtime - [`showdebug abilitysystem`](#debugging-sd) and hooks in the [`GameplayDebugger`](#debugging-gd).

**Tip:** Unreal Engine likes to optimize C++ code which makes it hard to debug some functions. You will encounter this rarely when tracing deep into your code. If setting your Visual Studio solution configuration to `DebugGame Editor` still prevents tracing code or inspecting variables, you can disable all optimizations by wrapping the optimized function with the `UE_DISABLE_OPTIMIZATION` and `UE_ENABLE_OPTIMIZATION` macros or the ship variations defined in CoreMiscDefines.h. This cannot be used on the plugin code unless you rebuild the plugin from source. This may or may not work on inline functions depending on what they do and where they are. Be sure to remove the macros when you're done debugging!

```c++
UE_DISABLE_OPTIMIZATION
void MyClass::MyFunction(int32 MyIntParameter)
{
	// My code
}
UE_ENABLE_OPTIMIZATION
```

**[⬆ 回到顶部](#table-of-contents)**

<a name="debugging-sd"></a>
### 6.1 showdebug abilitysystem
Type `showdebug abilitysystem` in the in-game console. This feature is split into three "pages". All three pages will show the `GameplayTags` that you currently have. Type `AbilitySystem.Debug.NextCategory` into the console to cycle between the pages.

The first page shows the `CurrentValue` of all of your `Attributes`:
![First Page of showdebug abilitysystem](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/showdebugpage1.png)

The second page shows all of the `Duration` and `Infinite` `GameplayEffects` on you, their number of stacks, what `GameplayTags` they give, and what `Modifiers` they give.
![Second Page of showdebug abilitysystem](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/showdebugpage2.png)

The third page shows all of the `GameplayAbilities` that have been granted to you, whether they are currently running, whether they are blocked from activating, and the status of currently running `AbilityTasks`.
![Third Page of showdebug abilitysystem](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/showdebugpage3.png)

To cycle between targets (denoted by a green rectangular prism around the Actor), use the `PageUp` key or `NextDebugTarget` console command to go to the next target and the `PageDown` key or `PreviousDebugTarget` console command to go to the previous target.

**Note:** In order for the ability system information to update based on the currently selected debug Actor, you need to set `bUseDebugTargetFromHud=true` in the `AbilitySystemGlobals` like so in the `DefaultGame.ini`:
```
[/Script/GameplayAbilities.AbilitySystemGlobals]
bUseDebugTargetFromHud=true
```

**Note:** For `showdebug abilitysystem` to work an actual HUD class must be selected in the GameMode. Otherwise the command is not found and "Unknown Command" is returned.

**[⬆ 回到顶部](#table-of-contents)**

<a name="debugging-gd"></a>
### 6.2 Gameplay Debugger
GAS adds functionality to the Gameplay Debugger. Access the Gameplay Debugger with the Apostrophe (') key. Enable the Abilities category by pressing 3 on your numpad. The category may be different depending on what plugins you have. If your keyboard doesn't have a numpad like a laptop, then you can change the keybindings in the project settings.

Use the Gameplay Debugger when you want to see the `GameplayTags`, `GameplayEffects`, and `GameplayAbilities` on **other** `Characters`. Unfortunately it does not show the `CurrentValue` of the target's `Attributes`. It will target whatever `Character` is in the center of your screen. You can change targets by selecting them in the World Outliner in the Editor or by looking at a different `Character` and press Apostrophe (') again. The currently inspected `Character` has the largest red circle above it.

![Gameplay Debugger](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/gameplaydebugger.png)

**[⬆ 回到顶部](#table-of-contents)**

<a name="debugging-log"></a>
### 6.3 GAS Logging
The GAS source code contains a lot of logging statements produced at varying verbosity levels. You will most likely see these as `ABILITY_LOG()` statements. The default verbosity level is `Display`. Anything higher will not be displayed in the console by default.

To change the verbosity level of a log category, type into your console:

```
log [category] [verbosity]
```

For example, to turn on `ABILITY_LOG()` statements, you would type into your console:
```
log LogAbilitySystem VeryVerbose
```

To reset it back to default, type:
```
log LogAbilitySystem Display
```

To display all log categories, type:
```
log list
```

Notable GAS related logging categories:

| Logging Category          | Default Verbosity Level |
| ------------------------- | ----------------------- |
| LogAbilitySystem          | Display                 |
| LogAbilitySystemComponent | Log                     |
| LogGameplayCueDetails     | Log                     |
| LogGameplayCueTranslator  | Display                 |
| LogGameplayEffectDetails  | Log                     |
| LogGameplayEffects        | Display                 |
| LogGameplayTags           | Log                     |
| LogGameplayTasks          | Log                     |
| VLogAbilitySystem         | Display                 |

See the [Wiki on Logging](https://unrealcommunity.wiki/logging-lgpidy6i) for more information.

**[⬆ 回到顶部](#table-of-contents)**

<a name="optimizations"></a>
## 7. Optimizations

<a name="optimizations-abilitybatching"></a>
### 7.1 Ability Batching
[`GameplayAbilities`](#concepts-ga) that activate, optionally send `TargetData` to the server, and end all in one frame can be [batched to condense two-three RPCs into one RPC](#concepts-ga-batching). These types of abilities are commonly used for hitscan guns.

<a name="optimizations-gameplaycuebatching"></a>
### 7.2 Gameplay Cue Batching
If you're sending many [`GameplayCues`](#concepts-gc) at the same time, consider [batching them into one RPC](#concepts-gc-batching). The goal is to reduce the number of RPCs (`GameplayCues` are unreliable NetMulticasts) and send as little data as possible.

<a name="optimizations-ascreplicationmode"></a>
### 7.3 AbilitySystemComponent Replication Mode
By default, the [`ASC`](#concepts-asc) is in [`Full Replication Mode`](#concepts-asc-rm). This will replicate all [`GameplayEffects`](#concepts-ge) to every client (which is fine for a single player game). In a multiplayer game, set the player owned `ASCs` to `Mixed Replication Mode` and AI controlled characters to `Minimal Replication Mode`. This will replicate `GEs` applied on a player character to only replicate to the owner of that character and `GEs` applied on AI controlled characters will never replicate `GEs` to clients. [`GameplayTags`](#concepts-gt) will still replicate and [`GameplayCues`](#concepts-gc) will still be unreliable NetMulticast to all clients, regardless of the `Replication Mode`. This will cut down on network data from `GEs` being replicated when all clients don't need to see them.

<a name="optimizations-attributeproxyreplication"></a>
### 7.4 Attribute Proxy Replication
In large games with many players like Fortnite Battle Royale (FNBR), there will be a lot of [`ASCs`](#concepts-asc) living on always-relevant `PlayerStates` replicating a lot of [`Attributes`](#concepts-a). To optimize this bottleneck, Fortnite disables the `ASC` and its [`AttributeSets`](#concepts-as) from replicating altogether on **simulated player-controlled proxies** in the `PlayerState::ReplicateSubobjects()`. Autonomous proxies and AI controlled `Pawns` still fully replicate according to their [`Replication Mode`](#concepts-asc-rm). Instead of replicating `Attributes` on the `ASC` on the always-relevant `PlayerStates`, FNBR uses a replicated proxy structure on the player's `Pawn`. When `Attributes` change on the server's `ASC`, they are changed on the proxy struct too. The client receives the replicated `Attributes` from the proxy struct and pushes the changes back into its local `ASC`. This allows `Attribute` replication to use the `Pawn`'s relevancy and `NetUpdateFrequency`. This proxy struct also replicates a small white-listed set of `GameplayTags` in a bitmask. This optimization reduces the amount of data over the network and allows us to take advantage of pawn relevancy. AI controlled `Pawns` have their `ASC` on the `Pawn` which already uses its relevancy so this optimization is not needed for them.

> I’m not sure if it is still necessary with other server side optimizations that have been done since then (Replication Graph, etc) and it is not the most maintainable pattern.

*Dave Ratti from Epic's answer to [community questions #3](https://epicgames.ent.box.com/s/m1egifkxv3he3u3xezb9hzbgroxyhx89)*

<a name="optimizations-asclazyloading"></a>
### 7.5 ASC Lazy Loading
Fortnite Battle Royale (FNBR) has a lot of damageable `AActors` (trees, buildings, etc) in the world, each with an [`ASC`](#concepts-asc). This can add up in memory cost. FNBR optimizes this by lazily loading `ASCs` only when they're needed (when they first take damage by a player). This reduces overall memory usage since some `AActors` may never be damaged in a match.

**[⬆ 回到顶部](#table-of-contents)**

<a name="qol"></a>
## 8. Quality of Life Suggestions

<a name="qol-gameplayeffectcontainers"></a>
### 8.1 Gameplay Effect Containers
[GameplayEffectContainers](#concepts-ge-containers) combine [`GameplayEffectSpecs`](#concepts-ge-spec), [`TargetData`](#concepts-targeting-data), [simple targeting](#concepts-targeting-containers), and related functionality into easy to use structures. These are great for transfering `GameplayEffectSpecs` to projectiles spawned from an ability that will then apply them on collision at a later time.

<a name="qol-asynctasksascdelegates"></a>
### 8.2 Blueprint AsyncTasks to Bind to ASC Delegates
To increase designer-friendly iteration times, especially when designing UMG Widgets for UI, create Blueprint AsyncTasks (in C++) to bind to the common change delegates on the `ASC` directly from your UMG Blueprint graphs. The only caveat is that they must be manually destroyed (like when the widget is destroyed) otherwise they will live in memory forever. The Sample Project includes three Blueprint AsyncTasks.

Listen for `Attribute` changes:

![Listen for Attributes Changes BP Node](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/attributeschange.png)

Listen for cooldown changes:

![Listen for Cooldown Change BP Node](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/cooldownchange.png)

Listen for `GE` stack changes:

![Listen for GameplayEffect Stack Change BP Node](https://github.com/flyingSnow-hu/GASDocumentationCN/raw/master/Images/gestackchange.png)

**[⬆ 回到顶部](#table-of-contents)**

<a name="troubleshooting"></a>
## 9. Troubleshooting

<a name="troubleshooting-notlocal"></a>
### 9.1 `LogAbilitySystem: Warning: Can't activate LocalOnly or LocalPredicted ability %s when not local!`
You need to [initialize the `ASC` on the client](#concepts-asc-setup).

**[⬆ 回到顶部](#table-of-contents)**

<a name="troubleshooting-scriptstructcache"></a>
### 9.2 `ScriptStructCache` errors
You need to call [`UAbilitySystemGlobals::InitGlobalData()`](#concepts-asg-initglobaldata).

**[⬆ 回到顶部](#table-of-contents)**

<a name="troubleshooting-replicatinganimmontages"></a>
### 9.3 Animation Montages are not replicating to clients
Make sure that you're using the `PlayMontageAndWait` Blueprint node instead of `PlayMontage` in your [GameplayAbilities](#concepts-ga). This [AbilityTask](#concepts-at) replicates the montage through the `ASC` automatically whereas the `PlayMontage` node does not.

**[⬆ 回到顶部](#table-of-contents)**

<a name="troubleshooting-duplicatingblueprintactors"></a>
### 9.4 Duplicating Blueprint Actors is setting AttributeSets to nullptr
There is a [bug in Unreal Engine](https://issues.unrealengine.com/issue/UE-81109) that will set `AttributeSet` pointers on your classes to nullptr for Blueprint Actor classes that are duplicated from existing Blueprint Actor classes. There are a few workarounds for this. I've had success not creating bespoke `AttributeSet` pointers on my classes (no pointer in the .h, not calling `CreateDefaultSubobject` in the constructor) and instead just directly adding `AttributeSets` to the `ASC` in `PostInitializeComponents()` (not shown in the Sample Project). The replicated `AttributeSets` will still live in the `ASC's` `SpawnedAttributes` array. It would look something like this:

```c++
void AGDPlayerState::PostInitializeComponents()
{
	Super::PostInitializeComponents();

	if (AbilitySystemComponent)
	{
		AbilitySystemComponent->AddSet<UGDAttributeSetBase>();
		// ... any other AttributeSets that you may have
	}
}
```

In this scenario, you would read and set the values in the `AttributeSet` using the functions on the `ASC` instead of [calling functions on the `AttributeSet` made from the macros](#concepts-as-attributes).

```c++
/** Returns current (final) value of an attribute */
float GetNumericAttribute(const FGameplayAttribute &Attribute) const;

/** Sets the base value of an attribute. Existing active modifiers are NOT cleared and will act upon the new base value. */
void SetNumericAttributeBase(const FGameplayAttribute &Attribute, float NewBaseValue);
```

So the `GetHealth()` would look something like:

```c++
float AGDPlayerState::GetHealth() const
{
	if (AbilitySystemComponent)
	{
		return AbilitySystemComponent->GetNumericAttribute(UGDAttributeSetBase::GetHealthAttribute());
	}

	return 0.0f;
}
```

Setting (initializing) the health `Attribute` would look something like:

```c++
const float NewHealth = 100.0f;
if (AbilitySystemComponent)
{
	AbilitySystemComponent->SetNumericAttributeBase(UGDAttributeSetBase::GetHealthAttribute(), NewHealth);
}
```

As a reminder, the `ASC` only ever expects at most one `AttributeSet` object per `AttributeSet` class.

**[⬆ 回到顶部](#table-of-contents)**

<a name="troubleshooting-unresolvedexternalsymbolmarkpropertydirty"></a>
### 9.5 unresolved external symbol UEPushModelPrivate::MarkPropertyDirty(int,int)

If you get a compiler error like:

```
error LNK2019: unresolved external symbol "__declspec(dllimport) void __cdecl UEPushModelPrivate::MarkPropertyDirty(int,int)" (__imp_?MarkPropertyDirty@UEPushModelPrivate@@YAXHH@Z) referenced in function "public: void __cdecl FFastArraySerializer::IncrementArrayReplicationKey(void)" (?IncrementArrayReplicationKey@FFastArraySerializer@@QEAAXXZ)
```

This is from trying to call `MarkItemDirty()` on a `FFastArraySerializer`. I've encountered this from updating an `ActiveGameplayEffect` such as when updating the cooldown duration.

```c++
ActiveGameplayEffects.MarkItemDirty(*AGE);
```

What's happening is that `WITH_PUSH_MODEL` is getting defined in more than one place. `PushModelMacros.h` is defining it as 0 while it's defined as 1 in multiple places. `PushModel.h` is seeing it as 1 but `PushModel.cpp` is seeing it as 0.

The solution is to add `NetCore` to your project's `PublicDependencyModuleNames` in the `Build.cs`.

**[⬆ 回到顶部](#table-of-contents)**

<a name="troubleshooting-enumnamesarenowpathnames"></a>
### 9.6 Enum names are now represented by path name

If you get a compiler warning like:

```
warning C4996: 'FGameplayAbilityInputBinds::FGameplayAbilityInputBinds': Enum names are now represented by path names. Please use a version of FGameplayAbilityInputBinds constructor that accepts FTopLevelAssetPath. Please update your code to the new API before upgrading to the next release, otherwise your project will no longer compile.
```

UE 5.1 deprecated using `FString` in the constructor for `BindAbilityActivationToInputComponent()`. Instead, we must pass in an `FTopLevelAssetPath`.

Old, deprecated way:
```c++
AbilitySystemComponent->BindAbilityActivationToInputComponent(InputComponent, FGameplayAbilityInputBinds(FString("ConfirmTarget"),
	FString("CancelTarget"), FString("EGDAbilityInputID"), static_cast<int32>(EGDAbilityInputID::Confirm), static_cast<int32>(EGDAbilityInputID::Cancel)));
```

New way:
```c++
FTopLevelAssetPath AbilityEnumAssetPath = FTopLevelAssetPath(FName("/Script/GASDocumentation"), FName("EGDAbilityInputID"));
AbilitySystemComponent->BindAbilityActivationToInputComponent(InputComponent, FGameplayAbilityInputBinds(FString("ConfirmTarget"),
	FString("CancelTarget"), AbilityEnumAssetPath, static_cast<int32>(EGDAbilityInputID::Confirm), static_cast<int32>(EGDAbilityInputID::Cancel)));
```

See `Engine\Source\Runtime\CoreUObject\Public\UObject\TopLevelAssetPath.h` for more info.

**[⬆ 回到顶部](#table-of-contents)**

<a name="acronyms"></a>
## 10. Common GAS Acronyms

| Name                                                                                                   | Acronyms            |
|------------------------------------------------------------------------------------------------------- | ------------------- |
| AbilitySystemComponent                                                                                 | ASC                 |
| AbilityTask                                                                                            | AT                  |
| [Action RPG Sample Project by Epic](https://www.unrealengine.com/marketplace/en-US/product/action-rpg) | ARPG, ARPG Sample   |
| CharacterMovementComponent                                                                             | CMC                 |
| GameplayAbility                                                                                        | GA                  |
| GameplayAbilitySystem                                                                                  | GAS                 |
| GameplayCue                                                                                            | GC                  |
| GameplayEffect                                                                                         | GE                  |
| GameplayEffectExecutionCalculation                                                                     | ExecCalc, Execution |
| GameplayTag                                                                                            | Tag, GT             |
| ModifierMagnitudeCalculation                                                                           | ModMagCalc, MMC     |

**[⬆ 回到顶部](#table-of-contents)**

<a name="resources"></a>
## 11. Other Resources
* [Official Documentation](https://docs.unrealengine.com/en-US/Gameplay/GameplayAbilitySystem/index.html)
* Source Code!
   * Especially `GameplayPrediction.h`
* [Lyra Sample Project by Epic](https://unrealengine.com/marketplace/en-US/learn/lyra)
* [Action RPG Sample Project by Epic](https://www.unrealengine.com/marketplace/en-US/product/action-rpg)
* [Unreal Slackers Discord](https://unrealslackers.org/) has a text channel dedicated to GAS `#gameplay-ability-system`
   * Check pinned messages
* [GitHub repository of resources by Dan 'Pan'](https://github.com/Pantong51/GASContent)
* [YouTube Videos by SabreDartStudios](https://www.youtube.com/channel/UCCFUhQ6xQyjXDZ_d6X_H_-A)

<a name="resources-daveratti"></a>
### 11.1 Q&A With Epic Game's Dave Ratti

<a name="resources-daveratti-community1"></a>
#### 11.1.1 Community Questions 1
[Dave Ratti responses to the Unreal Slackers Discord Server community questions about GAS](https://epicgames.ent.box.com/s/m1egifkxv3he3u3xezb9hzbgroxyhx89):

1. How can we create scoped prediction windows on demand outside or irrespective of `GameplayAbilities`? For example, how can a fire and forget projectile locally predict a damage `GameplayEffect` when it hits an enemy?

> The PredictionKey system is not really meant to do this. Fundamentally this systems works by a client initiating a predictive action, telling the server about it with a key, and then both client and server running the same thing and associating predictive side effects with the given prediction key. For example, “I am predictively activating an ability” or “I have produced target data and am going to predictively run the part of the ability graph after the WaitTargetData task”.
>
> With this pattern, the PredictionKey “bounces” off the server and comes back to the client via UAbilitySystemComponent::ReplicatedPredictionKeyMap (replicated property). Once the key is replicated back from the server, the client is able to undo all of the locally predictive side effects (GameplayCues, GameplayEffects): the replicated versions *will be there* and if they aren’t then it was a misprediction. Knowing exactly when to undo the predictive side effects is crucial here: if you are too early you will see gaps, if you are too late you will have “double”. (Note this is referring to stateful prediction, like a looping GameplayCue of a duration based Gameplay Effect. “Burst” GameplayCues and instant Gameplay Effects are never “undone” or rolled back. They are just skipped on the client if there is a prediction key associated with them).
>
> To further hit home the point: it’s crucial that predictive action is something the server does not do on their own, but only does so when the client tells them to. So having a generic “Create a key on demand and tell the server so I can run something” does not work unless that “something” is something the server will only do once told to by the client.
>
> Backing up to the original question: something like a fire and forget projectile. Both Paragon and Fornite have projectile actor classes that use GameplayCues. However we do not use the Prediction Key system to do these. Instead we have a concept on Non-Replicated GameplayCues. GameplayCues that just fire off locally and are skipped by the server completely. Essentially all these are direct calls to UGameplayCueManager::HandleGameplayCue. They do not route through the UAbilitySystemComponent so no prediction key checks / early returns are made.
>
> The downside with non replicated GameplayCues is that, well, they are not replicated. So its up to the projectile class/blueprint to make sure the code paths that call these functions are running on everyone. We have for cues startup (called in BeginPlay), explosion, hit wall/character, etc.
>
> These type of events are already generated client side, so calling into a non replicated gameplay cue was no big deal. Complicated blueprints can be tricky, and are up to the author to make sure they understand what is running where.

2. When using a `WaitNetSync` `AbilityTask` with `OnlyServerWait` to create a scoped prediction window in a locally predicted `GameplayAbility`, could players potentially cheat by delaying their packets to the Server to control `GameplayAbility` timing since the Server is waiting for their RPC withtheir prediction key? Was this ever an issue in Paragon or Fortnite, and if so, what did Epic do to remedy it?

> Yes, this is a valid concern. Any ability blueprint running on the server that is waiting for a client “signal” is potentially vulnerable to lag switch type exploits.
>
> Paragon had a custom targeting task similar to UAbilityTask_WaitTargetData. In this task we had timeouts, or a “max delay” that we would wait on the client for instantaneous targeting modes. If the targeting mode was waiting for user confirmation (button press) then it would be ignored since the user is allowed to take his time. But for abilities that instantly confirmed targeting we would only wait a certain amount of time before either A) generating the target data server side or B) canceling the ability.
>
> We never had such mechanisms for WaitNetSync, which we used pretty sparingly.
>
> I don’t believe Fortnite makes use of anything like this though. The weapon abilities in Fortnite are special cased batched to a single fortnite-specific RPC: one RPC to activate the ability, provide target data, and end the ability. So weapon abilities are intrinsically not vulnerable to this in Battle Royale.
>
> My take is that this is something that could probably be solved system wide but I don’t see us making the change ourselves anytime soon. Spot fixing WaitNetSync to include a max delay for the case you mention is probably a reasonable task, but again - unlikely we will do this on our end in the immediate future.


3. Which `EGameplayEffectReplicationMode` did Paragon and Fortnite use and what are Epic’s recommendations for when to use each?

> Both games essentially use Mixed mode for their player controlled characters and Minimal for AI controlled (AI minions, jungle creeps, AI Husks, etc). This is what I would recommend most people using the system in a multiplayer game. The sooner into your project you set these, the better.
>
> Fortnite goes a few steps further with its optimizations. It actually does not replicate the UAbilitySystemComponent at all for simulated proxies. The component and attribute subobjects are skipped inside ::ReplicateSubobjects() on the owning fortnite player state class. We do push the bare minimum replicated data from the ability system component to a structure on the pawn itself (basically, a subset of attribute values and a white list subset of tags that we replicate down in a bitmask). We call this a “proxy”. On the receiving side we take the proxy data, replicated on the pawn, and push it back into ability system component on the player state. So you do have an ASC for each player in FNBR, it just doesn’t directly replicate: instead it replicates data via a minimal proxy struct on the pawn and then routes back to the ASC on receiving side. This is advantage since its A) a more minimal set of data B) takes advantage of pawn relevancy.
>
> I’m not sure if it is still necessary with other server side optimizations that have been done since then (Replication Graph, etc) and it is not the most maintainable pattern.


4. Since we cannot predict the removal of `GameplayEffects` as per `GameplayPrediction.h`, are there any strategies for mitigating the effects of latency on removing `GameplayEffects`? For example, when removing a movement speed slow, we currently have to wait for the Server to replicate the `GameplayEffect` removal resulting in a snap of the player’s character position.

> This is a tough one and I don’t have a good answer. We generally skirted around these problems with tolerances and smoothing. I totally agree that ability system and precise synchronization with the character movement system is not in a good place and something we do want to fix.
>
> I had a shelf of allowing predictive removal of GEs but could never work out all edge cases before having to move on. This doesn’t solve everything though since character movement still has an internal saved move buffer that does not know anything about the ability system and possible movement speed modifiers, etc. It is still possible to get into correction feedback loops even outside of not being able to predict the removal of GEs.
>
> If you think you have a case that is truly desperate, you are able to predictively add a GE that would inhibit your movement speed GEs. I’ve never done this myself but have theorized about it before. It may be able to help with a certain class of problem.


5. We know that the `AbilitySystemComponent` lives on the `PlayerState` in Paragon and Fortnite and on the `Character` in the Action RPG Sample. What are Epic’s internal rules, guidelines, or recommendations for where the AbilitySystemComponent should live, and what should its `Owner` be?

> In general I would say anything that does not need to respawn should have the Owner and Avatar actor be the same thing. Anything like AI enemies, buildings, world props, etc.
>
> Anything that does respawn should have the Owner and Avatar be different so that the Ability System Component does not need to be saved off / recreated / restored after a respawn. PlayerState is the logical choice it is replicated to all clients (where as PlayerController is not). The downside is PlayerStates are always relevant so you can run into problems in 100 player games (See notes on what FN did in question #3).


6. Is it viable to have several `AbilitySystemComponents` which have the same owner but different avatars (e.g. on pawn and weapon/items/projectiles with `Owner` set to `PlayerState`)?

> The first problem I see there would be implementing the IGameplayTagAssetInterface and IAbilitySystemInterface on the owning actor. The former may be possible: just aggregate the tags from all ASCs (but watch out - HasAllMatchingGameplayTags may be met only via cross ASC aggregation. It wouldn't be enough to just forward that calls to each ASC and OR the results together). But the later is even trickier: which ASC is the authoritative one? If someone wants to apply a GE - which one should receive it? Maybe you can work these out but this side of the problem will be the hardest: owners will multiple ASCs beneath them.
>
> Separate ASCs on the pawn and the weapon can make sense on its own though. E.g, distinguishing between tags the describe the weapon vs those that describe the owning pawn. Maybe it does make sense that tags granted to the weapon also “apply” to the owner and nothing else (E.g, attributes and GEs are independent but the owner will aggregate the owned tags like I describe above). This could work out, I am sure. But having multiple ASCs with the same owner may get dicey.


7. Is there a way to stop the Server from overwriting the cooldown duration of locally predicted abilities on the Owning Client? In scenarios of high latency, this would let the Owning Client "try" to activate the ability again when its local cooldown expires but it is still on cooldown on the Server. By the time the Owning Client's activation request reaches the Server over the network, the Server may be off cooldown or the Server might be able to queue the activation request for the remaining milliseconds that it has left. Otherwise as is, clients with higher latency have a longer delay before when they can reactivate an ability versus those with less latency. This is most apparent with very low cooldown abilities like a basic attack that can be less than one second of cooldown. If there isn't a way to stop the Server from overwriting the cooldown duration of locally predicted abilities, what is Epic's strategy for mitigating the effects of high latency on reactivating abilities? To word it another example-based way, how did Epic design Paragon's basic attacks and other abilities so that high latency players could attack or activate at the same speed as low latency players with local prediction?

> The short answer there is not a way to prevent this and Paragon definitely had the problem. Higher latency connections would have a lower ROF with basic attacks.
>
> I attempted to fix this by adding “GE reconciliation” where latency was taken into account when calculating GE duration. Essentially allowing the server to eat some of the total GE time so that the effective time of the GE client side would be 100% consistent with any amount of latency (though fluctuations could still cause issues). However I never got this working in a state that could ship and the project moved fast and we just never fully addressed it.
>
> Fortnite does its own bookkeeping for weapon firing rates: it does not use GEs for cooldowns on weapons. I would recommend this if this is a critical problem for your game.


8. What is Epic’s roadmap for the GameplayAbilitySystem plugin? Which features does Epic plan to add in 2019 and beyond?

> We feel that overall the system is pretty stable at this point and we don’t have anyone working on major new features. Bug fixes and small improvements occasionally are made for Fortnite or from UDN/pull requests, but that is it right now.
>
> Longer term, I think we will eventually do a “V2” or some big changes. We learned a lot from writing this system and feel we got a lot right and a lot wrong. I would love a chance to correct those mistakes and improve some of the fatal flaws that were pointed out above.
>
> If a V2 was to ever come, providing an upgrade path would be of utmost importance. We would never make a V2 and leave Fortnite on V1 forever: there would be some path or procedures that would automatically migrate as much as possible, though there would still almost certainly be some manual remaking required.
>
> The high priority fixes would be:
> * Better interoperability with the character movement system. Unifying client prediction.
> * GE removal prediction (question #4)
> * GE latency reconciliation (question #7)
> * Generalized network optimizations such as batching RPCs and proxy structures. Mostly the stuff that we’ve done for Fortnite but find ways to break it down into more generalized form, at least so that games can write their own game specific optimizations more easily.
>
> The more general refactor type of changes I would consider making:
> * I would like to look at fundamentally moving away from having GEs reference spreadsheet values directly, instead they would be able to emit parameters and those parameters could be filled by some higher level object that is bound to spreadsheet values. The problem with the current model is that GEs become unsharable due to their tight coupling with the curve table rows. I think a generalized system for parameterization could be written and be the underpinning of a V2 system.
> * Reduce number of “policies” on UGameplayAbility. I would remove ReplicationPolicy and InstancingPolicy. Replication is, imo, almost never actually needed and causes confusion. InstancingPolicy should be replaced instead by making FGameplayAbilitySpec a UObject that can be subclassed. This should have been the “non instantiated ability object” that has events and is blueprintable. The UGameplayAbility should be the “instanced per execution” object. It could be optional if you need to actually instantiate: instead “non instanced” abilities would be implemented via the new UGameplayAbilitySpec object. 
> * The system should provide more “middle level” constructs such as “filtered GE application container” (data drive what GEs to apply to which actors with higher level gameplay logic), “Overlapping volume support” (apply the “Filtered GE application container” based on collision primitive overlap events), etc. These are building blocks that every project ends up implementing in their own way. Getting them right is non trivial so I think we should do a better job providing some basic implementations. 
> * In general, reducing boilerplate needed to get your project up and running. Possibly a separate module “Ex library” or whatever that could provide things like passive abilities or basic hitscan weapons out of the box. This module would be optional but would get you up and running quickly.
> * I would like to move GameplayCues to a separate module that is not coupled with the ability system. I think there are a lot of improvements that could be made here.


> This is only my personal opinion and not a commitment from anyone. I think the most realistic course of action will be as new engine tech initiatives come through, the ability system will need to be updated and that will be a time to do this sort of thing. These initiatives could be related to scripting, networking, or physics/character movement. This is all very far looking ahead though so I cannot give commitments or estimates on timelines.

**[⬆ 回到顶部](#table-of-contents)**

<a name="resources-daveratti-community2"></a>
#### 11.1.2 Community Questions 2
Community member [iniside](https://github.com/iniside)'s Q&A with Dave Ratti:

1. Is the support for decoupled fixed ticking planned? I'd like to
have Game Thread be fixed (like 30/60fps) and let the rendering thread
run wild. I ask if this is something we should expect in future or
not, to make some assumptions about how gameplay should work.
I ask mainly because there is now a fixed async tick for physics and
this poses a question how the rest of the system might work in the
future. I do not hide that having the ability to have fixed tick game
thread without also fixing tick rate of the rest of the engine would
be beyond awesome.

> There are no plans to decouple rendering frame rate and game thread tick frame rate. I think the ship has sailed on this ever happening due to the complexity of these systems and the requirement to preserve backwards compatibility with previous engine versions.
>
> Instead, the direction we've gone is to have an asynchronous "Physics Thread" which runs at a fixed tick rate, independent of the game thread. Things that need to run at a fixed rate can run here and the game thread / rendering can operate how they always have.
>
> It's worth clarifying that Network Prediction supports what it calls Independent Ticking and Fixed Ticking modes. My long term plan is to keep Independent Ticking roughly how it is today in Network Prediction where it runs on the game thread at variable frame rate and there is no "group/world" prediction, it's just the classic "clients predict their own pawn and owned actors" model. And Fixed Ticking would be what uses the async physics stuff and allows you to predict non client controlled/owned actors like physics objects and other clients/pawns/vehicles/etc.


2. Is there any plan on how the integration of Network Prediction will
look with the Ability System? Like for example, fixed frame ability
activation (so the server gets frames in which abilities were
activated and tasks executed instead of prediction keys)?

> Yes, the plan is to rewrite/remove the Ability System's prediction keys and replace them with Network Prediction constructs. The MockAbility examples in NetworkPredictionExtras show how this might work but they are more "hard coded" than what GAS will require. 
>
> The main idea would be that we remove the explicit client->server Prediction Key exchange in the ASC's RPCs. There would no longer be prediction windows or scoped prediction keys. Instead everything would be anchored around NetworkPrediction frames. The important thing is that client and server agree on when things happen. Examples would be:
>
> * When abilities were activated/ended/cancelled
> * When Gameplay Effects were applied/removed
> * Attribute values (what an attributes value was at frame X)
>
> I think this could be done generically at the ability system level. But actually making the user-defined logic inside a UGameplayAbility completely rollback-able would still take more work. We may end up having a subclass of UGameplayAbility that is fully rollbackable and has access to a more limited set of functionality or only Ability Tasks that are marked as rollback-friendly. Something like that. There are also many implications to animation events and root motion and how those are processed.
>
> Wish I had a more clear answer but it's really important we get the foundation right before touching GAS again. Movement and physics have to be solid before the higher level systems can be changed.


3. Is there a plan to move Network Prediction development toward the
main branch? Not gonna lie, I'd really like to check the latest code.
Regardless of it's state.

> We are working towards it. The system work is still all being done in NetworkPrediction (see NetworkPhysics.h) and the underlying async physics stuff should be all available (RewindData.h etc). But we also have use cases in Fortnite that we have been focused on that obviously can't be made public. We are working through bugs, performance optimizations, etc.
>
> For more context: when working on the early versions of this system, we were very focused on the "front end" of things - how state and simulations were defined and written. We learned a lot there. But as the async physics stuff has come online, we've been much more focused on just getting something real to work in this system, at the expense of throwing out some of our early abstractions. The goal here is to circle back when the real thing is working and reunifying things. E.g, get back to the "front end" and make the final version of that on top of the core pieces of tech we are working on now.


4. For some time on main branch there was a plugin for sending Gameplay
Messages (Looked like Event/Message Bus), but it was removed. Any
plans to restore it? With the Game Features/Modular Gameplay plugins,
having a generic Event Bus Dispatcher would be extremely useful.

> I think you are referring to the GameplayMessages plugin. This will probably come back at some point - the API isn't really finalized yet and the author didn't mean for it to be public yet. I agree it should be useful for modular gameplay design. But it's not really my area so I don't have much more information. 


5. I've been playing recently with async fixed physics and the results
are promising, though if there is going to be NP update in the future
I will probably just play around and wait, since to get it working I
still need to get entire engine into fixed tick and on the other hand
I try to keep physics at 33ms. Which does not make for a good
experience if everything is at 30 fps (:.

I have noticed there was some work on Async
CharacterMovementComponent, but not sure if this will be using Network
Prediction, or it is a separate effort?

Since I noticed it, I also went ahead and tried to implement my custom
async movement at fixed tick rate, which worked okay, but on top of it
I also needed to add a separate update for interpolation. The setup
was to run simulation tick on separate worker threads at fixed 33ms
update, do calculations, save result, and interpolate it at the game
thread to match current frame rate. Not perfect, but it got the job
done.

My question is, if this is something that might be easier to set up in
the future, as there is just quite a bit of boilerplate code to write,
(the interpolation part) and it's not particularly efficient to
interpolate each moving object individually.

The async stuff is really interesting, because it would allow you to
really run game simulation at fixed update rate (which would make
fixed thread unneeded) and have more predictable results. Is this
something that is intended going forward, or more of a benefit to
select systems? As far as I remember actor transforms are not updated
async and blueprints are not entirely thread safe. In other words is
it something that is planned to be supported at more of a framework
level or something that each game has to solve on it's own?

> Async CharacterMovementComponent
>
> This is basically an early prototype/experiment of porting CMC as it is to the physics thread. I don't view it as the future of CMC yet, but it could evolve into that. Right now there is no networking support so it's not something I would really follow. The people doing it are mostly concerned with measuring input latency that this system would add and how that could be mitigated.
>
> I still need to get entire engine into fixed tick and on the other hand I try to keep physics at 33ms. Which does not make for a good experience if everything is at 30 fps (:.
>
> The async stuff is really interesting, because it would allow you to really run game simulation at fixed update rate (which would make fixed thread unneeded) 
>
> Yes. The goal here is that with async physics enabled, you can run the engine at variable tick rate while the physics and "core" gameplay simulations can run at the fixed rate (such as character movement, vehicles, GAS, etc).
>
> These are the cvars that need to be set to enable this now: (I think you've figured this out)  
> `p.DefaultAsyncDt=0.03333`  
> `p.RewindCaptureNumFrames=64`
>
> Chaos does provide interpolation for the physics state (e.g, the transforms that get pushed back to the UPrimitiveComponent and are visible to the game code). There is a cvar now, `p.AsyncInterpolationMultiplier`, which controls that if you want to look at it. You should see smooth continuous motion of physics bodies without having to write any extra code. 
>
> If you want to interpolate non physics state, it is still up to you to do that right now. The example would be like a cool-down that you want to update (tick) on the async physics thread but see smooth continuous interpolation on the game thread so that every render frame the cool-down visualization is updated. We will get to this eventually but don't have examples yet.
>
> there is just quite a bit of boilerplate code to write,
>
> Yeah, so that has been a big general problem with the system up until now. We want to provide an interface that experienced programmers can use to maximize performance and safety (the ability to write gameplay code that "just works" predictively without tons of hazards and things you could-do-but-better-not). So something like CharacterMoverment might do a bunch of custom stuff to maximize its performance - e.g, writing templated code and doing batch updating, going wide, breaking the update loop into distinct phases etc. We want to provide a good "low level" interface into the async thread and rollback systems for this use case. And in this case too - it's still reasonable that the character movement system itself is extendable in its own way. For example providing a way to blueprint a custom movement mode and providing a blueprint API that is thread safe.
>
> But we recognize this is not acceptable for simpler gameplay objects that don't really need their own "system". Something more inline with Unreal is what is needed. E.g, using the reflection system, having general blueprint support, etc. There are examples of blueprints being used on other threads (see BlueprintThreadSafe keyword and what the animation system has been working towards). So I think there will be some form of this one day. But again, we aren't there yet.
>
> I realize you were just asking about interpolation but that is the general answer: right now we have you do everything manually like NetSerialize, ShouldReconcile, Interpolate, etc but eventually we'll have a way that is like "if you want to just use the reflection system, you don't have to manually write this stuff". We just don't want to *force* everyone to use the reflection system since that imposes other limitations that we think we don't want to take on the lowest levels of the system. 
>
> And then just to tie this back to what I said earlier - right now we are really focused on getting a few very specific examples working and performant and then we will turn attention back to the front end and making things friendly to use and iterate on, reducing boilerplate, etc for everybody else to use. 

**[⬆ 回到顶部](#table-of-contents)**

<a name="changelog"></a>
## 12. GAS Changelog

This is a list of notable changes (fixes, changes, and new features) to GAS compiled from the official Unreal Engine upgrade changelog and from undocumented changes that I've encountered. If you've found something that isn't listed here, please make an issue or pull request.

<a name="changelog-5.2"></a>
### 5.2
* Bug Fix: Fixed a crash in the `UAbilitySystemBlueprintLibrary::MakeSpecHandle` function.
* Bug Fix: Fixed logic in the Gameplay Ability System where a non-Controlled Pawn would be considered remote, even if it was spawned locally on the server (e.g. Vehicles).
* Bug Fix: Correctly set activation info on predicted instanced abilities that were rejected by the server.
* Bug Fix: Fixed a bug that would cause GameplayCues to get stuck on remote instances.
* Bug Fix: Fixed a memory stomp when chaining calls to WaitGameplayEvent.
* Bug Fix: Calling the AbilitySystemComponent `GetOwnedGameplayTags()` function in Blueprint no longer retains the previous call's return values when the same node is executed multiple times.
* Bug Fix: Fixed an issue with GameplayEffectContext replicating a reference to a dynamic object that would never be replicated.
  * This prevented GameplayEffect from calling `Owner->HandleDeferredGameplayCues(this)` as `bHasMoreUnmappedReferences` would always be true.
* New: The [Gameplay Targeting System](https://docs.unrealengine.com/en-US/gameplay-targeting-system-in-unreal-engine/) is a way to create data-driven targeting requests.
* New: Added custom serialization support for GameplayTag Queries.
* New: Added support for replicating derived FGameplayEffectContext types.
* New: Gameplay Attributes in assets are now registered as searchable names on save, allowing for references to attributes to be seen in the reference viewer.
* New: Added some basic unit tests for the AbilitySystemComponent.
* New: Gameplay Ability System Attributes now respect Core Redirects. This means you can now rename Attribute Sets and their Attributes in code and have them load properly in assets saved with the old names by adding redirect entries to DefaultEngine.ini.
* Change: Allow changing the evaluation channel of a Gameplay Effect Modifier from code.
* Change: Removed previously unused variable `FGameplayModifierInfo::Magnitude` from the Gameplay Abilities Plugin.
* Change: Removed the synchronization logic between the ability system component and Smart Object instance tags.

https://docs.unrealengine.com/5.2/en-US/unreal-engine-5.2-release-notes/

<a name="changelog-5.1"></a>
### 5.1
* Bug Fix: Fixed issue where replicated loose gameplay tags were not replicating to the owner.
* Bug Fix: Fixed AbilityTask bug where abilities could be blocked from timely garbage-collection.
* Bug Fix: Fixed an issue when a gameplay ability listening to activate based on a tag would fail to be activated. This would happen if there were more than one Gameplay Ability listening to this tag, and the first one in the list was invalid or didn't have authority to activate.
* Bug Fix: Fixed GameplayEffects that use Data Registries correctly from warning on load and improved the warning text.
* Bug Fix: Removed code from UGameplayAbility that was incorrectly only registering the last instanced ability with the Blueprint debugger for breakpoints.
* Bug Fix: Fixed Gameplay Ability System Ability getting stuck if EndAbility was called during the lock inside ApplyGameplayEffectSpecToTarget.
* New: Added support for Gameplay Effects to add blocked ability tags.
* New: Added WaitGameplayTagQuery nodes. One is based off of the UAbilityTask and the other is of UAbilityAsync. This node specifies a TagQuery, and will trigger its output pin when the query becomes true or false, based on configuration.
* New: Modified AbilityTask debugging in Console Variables to enable debug recording and printing to log by default in non-shipping builds (with ability to hotfix on/off as needed).
* New: You can now set AbilitySystem.AbilityTask.Debug.RecordingEnabled to 0 to disable, 1 to enable in non-shipping builds, and 2 to enable all builds (including shipping).
* New: You can use AbilitySystem.AbilityTask.Debug.AbilityTaskDebugPrintTopNResults to only print the top N results in log (to avoid log spam).
* New: STAT_AbilityTaskDebugRecording can be used to test perf impact from these on-by-default debugging changes.
* New: Added a debug command to filter GameplayCue events.
* New: Added new debug commandsAbilitySystem.DebugAbilityTags, AbilitySystem.DebugBlockedTags, andAbilitySystem.DebugAttribute to the Gameplay Ability System.
* New: Added a Blueprint function to get a debug string representation of a Gameplay Attribute.
* New: Added a new Gameplay Task resource overlap policy to cancel existing tasks.
* Change: Now Ability Tasks should make sure to call Super::OnDestroy only after they do anything needed to the Ability pointer, as it will be nulled out after calling it.
* Change: Converted FGameplayAbilitySpec/Def::SourceObject to be a weak reference.
* Change: Made a Ability System Component reference in the Ability Task a weak pointer so Garbage Collection can delete it.
* Change: Removed redundant enum EWaitGameplayTagQueryAsyncTriggerCondition.
* Change: GameplayTasksComponent and AbilitySystemComponent now support the registered subobject API.
* Change: Added better logging to indicate why Gameplay Abilities failed to be activated.
* Change: Removed AbilitySystem.Debug.NextTarget and PrevTarget commands in favor of global HUD NextDebugTarget and PrevDebugTarget commands.

https://docs.unrealengine.com/5.1/en-US/unreal-engine-5.1-release-notes/

<a name="changelog-5.0"></a>
### 5.0

https://docs.unrealengine.com/5.0/en-US/unreal-engine-5.0-release-notes/

<a name="changelog-4.27"></a>
### 4.27
* Crash Fix: Fixed a root motion source issue where a networked client could crash when an Actor finishes executing an ability that uses a constant force root motion task with a strength-over-time modifier.
* Bug Fix: Fixed a regression in Editor loading time when using GameplayCues.
* Bug Fix: GameplayEffectsContainer's `SetActiveGameplayEffectLevel` method will no longer dirty FastArray if setting the same EffectLevel.
* Bug Fix: Fixed an edge case in GameplayEffect mixed replication mode where Actors not explicitly owned by the net connection but who utilize that connection from `GetNetConnection` will not received mixed replication updates.
* Bug Fix: Fixed an endless recursion occuring in GameplayAbility's class method `EndAbility` which was called by calling `EndAbility` again from `K2_OnEndAbility`.
* Bug Fix: GameplayTags Blueprint pins will no longer be silently cleared if they are loaded before tags are registered. They now work the same as GameplayTag variables, and the behavior for both can be changed with the ClearInvalidTags option in the Project Settings.
* Bug Fix: Improved thread safety of GameplayTag operations.
* New: Exposed SourceObject to GameplayAbility's `K2_CanActivateAbility` method.
* New: Native GameplayTags. Introducing a new `FNativeGameplayTag`, these make it possible to do one off native tags that are correctly registered and unregistered when the module is loaded and unloaded.
* New: Updated `GiveAbilityAndActivateOnce` to pass in FGameplayEventData parameter.
* New: Improved ScalableFloats in the GameplayAbilities plugin to support dynamic lookup of curve tables from the new Data Registry System. Added a ScalableFloat header for easier reuse of the generic struct outside the abilities plugin.
* New: Added code support for using the GameplayTag UI in other Editor customizations via GameplayTagsEditorModule.
* New: Modified UGameplayAbility's PreActivate method to optionally take in trigger event data.
* New: Added more support to filter GameplayTags in the Editor using a project-specific filter. `OnFilterGameplayTag` supplies the referencing property and the tag source, so you can filter tags based on what asset is requesting the tag.
* New: Added option to preserve the original captured SourceTags when GameplayEffectSpec's class method `SetContext` is called after initialization.
* New: Improved UI for registering GameplayTags from specific plugins. The new tag UI now lets you select a plugin location on disk for newly added GameplayTag sources.
* New: A new track has been added to Sequencer to allow for triggering notify states on Actors built using the GameplayAbiltiySystem. Like notifies, the GameplayCueTrack can utilize range-based events or trigger-based events.
* Change: Changed the GameplayCueInterface to pass GameplayCueParameters struct by reference.
* Optimization: Made several performance improvements to loading and regenerating the GameplayTag table were implemented so that this option would be optimized.

https://docs.unrealengine.com/en-US/WhatsNew/Builds/ReleaseNotes/4_27/

<a name="changelog-4.26"></a>
### 4.26
* GAS plugin is no longer flagged as beta.
* Crash Fix: Fixed a crash when adding a gameplay tag without a valid tag source selection.
* Crash Fix: Added the path string arg to a message to fix a crash in UGameplayCueManager::VerifyNotifyAssetIsInValidPath.
* Crash Fix: Fixed an access violation crash in AbilitySystemComponent_Abilities when using a ptr without checking it.
* Bug Fix: Fixed a bug where stacking GEs that did not reset the duration on additional instances of the effect being applied.
* Bug Fix: Fixed an issue that caused CancelAllAbilities to only cancel non-instanced abilities.
* New: Added optional tag parameters to gameplay ability commit functions.
* New: Added StartTimeSeconds to PlayMontageAndWait ability task and improved comments.
* New: Added tag container "DynamicAbilityTags" to FGameplayAbilitySpec. These are optional ability tags that are replicated with the spec. They are also captured as source tags by applied gameplay effects.
* New: GameplayAbility IsLocallyControlled and HasAuthority functions are now callable from Blueprint.
* New: Visual logger will now only collect and store info about instant GEs if we're currently recording visual logging data.
* New: Added support for redirectors on gameplay attribute pins in blueprint nodes.
* New: Added new functionality for when root motion movement related ability tasks end they will return the movement component's movement mode to the movement mode it was in before the task started.

https://docs.unrealengine.com/en-US/WhatsNew/Builds/ReleaseNotes/4_26/

<a name="changelog-4.25.1"></a>
### 4.25.1
* Fixed! UE-92787 Crash saving blueprint with a Get Float Attribute node and the attribute pin is set inline
* Fixed! UE-92810 Crash spawning actor with instance editable gameplay tag property that was changed inline

<a name="changelog-4.25"></a>
### 4.25
* Fixed prediction of `RootMotionSource` `AbilityTasks`
* [`GAMEPLAYATTRIBUTE_REPNOTIFY()`](#concepts-as-attributes) now additionally takes in the old `Attribute` value. We must supply that as the optional parameter to our `OnRep` functions. Previously, it was reading the attribute value to try to get the old value. However, if called from a replication function, the old value had already been discarded before reaching SetBaseAttributeValueFromReplication so we'd get the new value instead.
* Added [`NetSecurityPolicy`](#concepts-ga-netsecuritypolicy) to `UGameplayAbility`.
* Crash Fix: Fixed a crash when adding a gameplay tag without a valid tag source selection.
* Crash Fix: Removed a few ways for attackers to crash a server through the ability system.
* Crash Fix: We now make sure we have a GameplayEffect definition before checking tag requirements.
* Bug Fix: Fixed an issue with gameplay tag categories not applying to function parameters in Blueprints if they were part of a function terminator node.
* Bug Fix: Fixed an issue with gameplay effects' tags not being replicated with multiple viewports.
* Bug Fix: Fixed a bug where a gameplay ability spec could be invalidated by the InternalTryActivateAbility function while looping through triggered abilities.
* Bug Fix: Changed how we handle updating gameplay tags inside of tag count containers. When deferring the update of parent tags while removing gameplay tags, we will now call the change-related delegates after the parent tags have updated. This ensures that the tag table is in a consistent state when the delegates broadcast.
* Bug Fix: We now make a copy of the spawned target actor array before iterating over it inside when confirming targets because some callbacks may modify the array.
* Bug Fix: Fixed a bug where stacking GameplayEffects that did not reset the duration on additional instances of the effect being applied and with set by caller durations would only have the duration correctly set for the first instance on the stack. All other GE specs in the stack would have a duration of 1 second. Added automation tests to detect this case.
* Bug Fix: Fixed a bug that could occur if handling gameplay event delegates modified the list of gameplay event delegates.
* Bug Fix: Fixed a bug causing GiveAbilityAndActivateOnce to behave inconsistently.
* Bug Fix: Reordered some operations inside FGameplayEffectSpec::Initialize to deal with a potential ordering dependency.
* New: UGameplayAbility now has an OnRemoveAbility function. It follows the same pattern as OnGiveAbility and is only called on the primary instance of the ability or the class default object.
* New: When displaying blocked ability tags, the debug text now includes the total number of blocked tags.
* New: Renamed UAbilitySystemComponent::InternalServerTryActiveAbility to UAbilitySystemComponent::InternalServerTryActivateAbility.Code that was calling InternalServerTryActiveAbility should now call InternalServerTryActivateAbility.
* New: Continue to use the filter text for displaying gameplay tags when a tag is added or deleted. The previous behavior cleared the filter.
* New: Don't reset the tag source when we add a new tag in the editor.
* New: Added the ability to query an ability system component for all active gameplay effects that have a specified set of tags. The new function is called GetActiveEffectsWithAllTags and can be accessed through code or blueprints.
* New: When root motion movement related ability tasks end they now return the movement component's movement mode to the movement mode it was in before the task started.
* New: Made SpawnedAttributes transient so it won't save data that can become stale and incorrect. Added null checks to prevent any currently saved stale data from propagating. This prevents problems related to bad data getting stored in SpawnedAttributes.
* API Change: AddDefaultSubobjectSet has been deprecated. AddAttributeSetSubobject should be used instead.
* New: Gameplay Abilities can now specify the Anim Instance on which to play a montage.

https://docs.unrealengine.com/en-US/WhatsNew/Builds/ReleaseNotes/4_25/

<a name="changelog-4.24"></a>
### 4.24
* Fixed blueprint node `Attribute` variables resetting to `None` on compile.
* Need to call [`UAbilitySystemGlobals::InitGlobalData()`](#concepts-asg-initglobaldata) to use [`TargetData`](#concepts-targeting-data) otherwise you will get `ScriptStructCache` errors and clients will be disconnected from the server. My advice is to always call this in every project now whereas before 4.24 it was optional.
* Fixed crash when copying a `GameplayTag` setter to a blueprint that didn't have the variable previously defined.
* `UGameplayAbility::MontageStop()` function now properly uses the `OverrideBlendOutTime` parameter.
* Fixed `GameplayTag` query variables on components not being modified when edited.
* Added the ability for `GameplayEffectExecutionCalculations` to support scoped modifiers against "temporary variables" that aren't required to be backed by an attribute capture.
  * Implementation basically enables `GameplayTag`-identified aggregators to be created as a means for an execution to expose a temporary value to be manipulated with scoped modifiers; you can now build formulas that want manipulatable values that don't need to be captured from a source or target.
  * To use, an execution has to add a tag to the new member variable `ValidTransientAggregatorIdentifiers`; those tags will show up in the calculation modifier array of scoped mods at the bottom, marked as temporary variables—with updated details customizations accordingly to support feature
* Added restricted tag quality-of-life improvements. Removed the default option for restricted `GameplayTag` source. We no longer reset the source when adding restricted tags to make it easier to add several in a row. 
* `APawn::PossessedBy()` now sets the owner of the `Pawn` to the new `Controller`. Useful because [Mixed Replication Mode](#concepts-asc-rm) expects the owner of the `Pawn` to be the `Controller` if the `ASC` lives on the `Pawn`.
* Fixed bug with POD (Plain Old Data) in `FAttributeSetInitterDiscreteLevels`.

https://docs.unrealengine.com/en-US/WhatsNew/Builds/ReleaseNotes/4_24/

**[⬆ 回到顶部](#table-of-contents)**