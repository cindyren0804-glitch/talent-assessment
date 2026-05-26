// 应用状态
let currentPage = 'home';
let currentQuestion = 1;
let timer = null;
let timeLeft = 20;
let answers = [];

// 题目数据（20道职场新人版迫选题）
const questions = [
    {
        text: "刚入职第一周，领导让你熟悉业务，你会...",
        a: "先快速浏览所有相关资料，建立整体认知框架",
        b: "挑一个核心模块深入研究，搞透它再扩展",
        themeA: "搜集",
        themeB: "专注"
    },
    {
        text: "和同事合作项目，对方进度落后了，你会...",
        a: "分析原因，看看是流程问题还是能力问题，一起找解决方案",
        b: "先关心他是不是遇到什么困难，情绪状态怎么样",
        themeA: "分析",
        themeB: "共情"
    },
    {
        text: "团队有个重复性工作需要优化，你会...",
        a: "想设计一个标准流程/模板，让大家以后都能高效完成",
        b: "先把这个任务高效做完，然后再看有没有必要优化流程",
        themeA: "系统",
        themeB: "执行"
    },
    {
        text: "领导交代了一个你不太感兴趣的任务，你会...",
        a: "虽然不感兴趣，但做好了能获得认可，我就能投入去做",
        b: "只有觉得这件事有意义/有价值，我才有动力做好",
        themeA: "成就",
        themeB: "意义"
    },
    {
        text: "要学习一个新领域的知识，你会...",
        a: "广泛搜集各种资料，从多个角度了解这个领域",
        b: "找到最核心的几本经典，用逻辑框架消化吸收",
        themeA: "搜集",
        themeB: "分析"
    },
    {
        text: "你对一个技术难题死磕了很久还没解决，你会...",
        a: "继续钻研，直到搞懂为止，这是我的执念",
        b: "停下来，找人聊聊，也许换个心情就有新思路了",
        themeA: "专注",
        themeB: "共情"
    },
    {
        text: "你刚建立了一个高效的工作流程，最爽的是...",
        a: "看到整个系统运转顺畅，流程被优化得很优雅",
        b: "因为这个流程，我/团队拿到了好结果，被表扬了",
        themeA: "系统",
        themeB: "成就"
    },
    {
        text: "老板让你做一件你觉得没意义的事，你会...",
        a: "就算没意义，先高效完成再说，执行力是第一位的",
        b: "尝试理解意义，或者和老板沟通，否则很难投入",
        themeA: "执行",
        themeB: "意义"
    },
    {
        text: "朋友找你吐槽工作烦恼，你会...",
        a: "帮他分析问题根源，给出解决建议",
        b: "先倾听，让他把情绪宣泄出来，表示理解",
        themeA: "分析",
        themeB: "共情"
    },
    {
        text: "手头有多个任务要做，你会...",
        a: "先专注做完一个，再做下一个，这样效率高",
        b: "先规划整体节奏，协调好各任务的进度安排",
        themeA: "专注",
        themeB: "系统"
    },
    {
        text: "公司团建活动，你可以提议玩法，你会...",
        a: "想尝试各种新鲜有趣的活动，让大家体验不同的东西",
        b: "想选择能让大家都放松、愉快互动的活动，氛围更重要",
        themeA: "搜集",
        themeB: "共情"
    },
    {
        text: "你收藏了很多有用的工作资料和文章，你会...",
        a: "喜欢不断收藏新的，涉猎越广越好，说不定哪天用上",
        b: "定期整理归类，建立一个清晰的资料库体系",
        themeA: "搜集",
        themeB: "系统"
    },
    {
        text: "发现了一个工作流程中的小问题，你会...",
        a: "想彻底研究透这个问题，找出根因，哪怕花点时间",
        b: "先快速修掉，保证进度，后面有空再优化",
        themeA: "专注",
        themeB: "执行"
    },
    {
        text: "团队要做一个新项目，你会...",
        a: "先分析项目的底层逻辑和商业可行性",
        b: "先设计项目的整体框架和执行路线图",
        themeA: "分析",
        themeB: "系统"
    },
    {
        text: "领导临时加了一个需求，你会...",
        a: "需要先搞清楚这个需求的合理性和逻辑，再动手",
        b: "直接开干，边做边理解，先交付再说",
        themeA: "分析",
        themeB: "执行"
    },
    {
        text: "项目成功了，你最开心的是...",
        a: "看到团队成员都很开心、有成就感，氛围特别好",
        b: "项目成果被领导认可，自己拿到了好绩效/表扬",
        themeA: "共情",
        themeB: "成就"
    },
    {
        text: "朋友拉你参与一个公益项目，你会...",
        a: "参与是因为和朋友一起做这件事很开心，过程很重要",
        b: "参与是因为认同这个公益项目的价值和意义",
        themeA: "共情",
        themeB: "意义"
    },
    {
        text: "公司推行一个新的管理制度，你会...",
        a: "如果这个制度设计合理、逻辑清晰，我可以接受",
        b: "如果这个制度能让工作更有意义感，我才会支持",
        themeA: "系统",
        themeB: "意义"
    },
    {
        text: "周末你打算提升自己，你会...",
        a: "安排满满的计划，高效执行，学完一门课/看完一本书",
        b: "选择能拿到证书/作品/成果的学习，有结果才有动力",
        themeA: "执行",
        themeB: "成就"
    },
    {
        text: "年终总结时，你更想展示...",
        a: "这一年涉猎了很多领域，知识面更广了",
        b: "这一年拿到了 XX 成果/奖项/认可，有具体成绩",
        themeA: "搜集",
        themeB: "成就"
    }
];

// 页面切换
function goToPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    const pageElement = document.getElementById(pageId);
    if (pageElement) {
        pageElement.classList.add('active');
    }
    currentPage = pageId;
    
    // 特殊处理
    if (pageId === 'report-role') {
        setTimeout(() => {
            drawRadarChart();
        }, 300);
    }
}

// 选项选择（画像页）
document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.parentElement.querySelectorAll('.option-btn').forEach(b => {
            b.classList.remove('selected');
        });
        this.classList.add('selected');
    });
});

// 开始答题
function startQuiz() {
    goToPage('quiz');
    loadQuestion(1);
}

// 加载题目
function loadQuestion(num) {
    currentQuestion = num;
    
    // 确保不超出题目范围
    const qIndex = (num - 1) % questions.length;
    const q = questions[qIndex];
    
    // 先清除选择状态（在更新内容之前）
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.classList.remove('selected');
        btn.style.pointerEvents = 'auto';
        btn.style.background = '';
        btn.style.borderColor = '';
    });
    
    // 更新题目内容
    document.getElementById('current-q').textContent = num;
    document.getElementById('question-text').textContent = q.text;
    document.querySelector('#choice-a .text').textContent = q.a;
    document.querySelector('#choice-b .text').textContent = q.b;
    
    // 再次确保清除选择状态
    setTimeout(() => {
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
    }, 10);
    
    // 启动计时器
    startTimer();
}

// 计时器
function startTimer() {
    timeLeft = 20;
    clearInterval(timer);
    
    updateTimerDisplay();
    
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function updateTimerDisplay() {
    document.getElementById('timer').textContent = timeLeft;
    const percentage = (timeLeft / 20) * 100;
    document.getElementById('timer-fill').style.width = percentage + '%';
    
    // 时间少于5秒变红色 + 警告动画
    const timerEl = document.querySelector('.timer');
    if (timeLeft <= 5) {
        timerEl.classList.add('warning');
    } else {
        timerEl.classList.remove('warning');
    }
}

// 选择答案
function selectChoice(choice) {
    clearInterval(timer);
    
    // 防止重复点击
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.style.pointerEvents = 'none';
    });
    
    // 记录答案
    const qIndex = (currentQuestion - 1) % questions.length;
    const q = questions[qIndex];
    answers.push({
        question: currentQuestion,
        choice: choice,
        theme: choice === 'a' ? q.themeA : q.themeB
    });
    
    // 视觉反馈
    document.getElementById('choice-' + choice).classList.add('selected');
    
    // 延迟进入下一题
    setTimeout(nextQuestion, 500);
}

// 下一题
function nextQuestion() {
    if (currentQuestion < 20) {
        loadQuestion(currentQuestion + 1);
    } else {
        finishQuiz();
    }
}

// 天赋数据配置
const themeData = {
    '搜集': {
        icon: '📚',
        name: '广度涉猎',
        desc: '热衷收集信息',
        behaviors: ['订阅大量公众号、囤资料', '喜欢了解新事物、新领域', '知识面宽，是团队里的"知识枢纽"'],
        bestScenarios: ['快速了解一个新领域', '建立跨领域连接', '信息整合'],
        watchOut: '信息收集时停不下来，因为"万一有用呢"'
    },
    '专注': {
        icon: '🎯',
        name: '深度死磕',
        desc: '深耕单一领域',
        behaviors: ['可以长时间钻研一件事', '对细节有执念', '追求把事情做到极致'],
        bestScenarios: ['需要深度思考的任务', '技术研究', '复杂问题解决'],
        watchOut: '可能忽略其他重要事项，陷入完美主义'
    },
    '分析': {
        icon: '🔍',
        name: '逻辑推演',
        desc: '依赖理性推导',
        behaviors: ['做决定要数据支撑', '喜欢拆解问题', '寻找逻辑漏洞'],
        bestScenarios: ['数据分析', '问题诊断', '决策支持'],
        watchOut: '过度分析导致行动延迟，忽略情感因素'
    },
    '共情': {
        icon: '💝',
        name: '情绪感知',
        desc: '敏感他人情绪',
        behaviors: ['容易感知他人感受', '善于倾听', '关注团队氛围'],
        bestScenarios: ['团队协作', '客户沟通', '冲突调解'],
        watchOut: '容易被他人情绪影响，边界感不强'
    },
    '系统': {
        icon: '🏗️',
        name: '系统构建',
        desc: '擅长设计流程',
        behaviors: ['喜欢制定规则', '善于搭建框架', '追求效率和秩序'],
        bestScenarios: ['流程设计', '项目管理', '体系建设'],
        watchOut: '太追求系统的完美，可能延迟行动'
    },
    '执行': {
        icon: '⚡',
        name: '执行力',
        desc: '擅长落地执行',
        behaviors: ['说干就干不拖延', '注重结果导向', '快速响应'],
        bestScenarios: ['紧急任务', '目标明确的执行', '快速迭代'],
        watchOut: '可能忽略规划和质量，只求速度'
    },
    '成就': {
        icon: '🏆',
        name: '成就驱动',
        desc: '追求结果认可',
        behaviors: ['需要外部反馈驱动', '追求可见成果', '在意绩效和认可'],
        bestScenarios: ['目标明确的任务', '竞争环境', '结果导向的工作'],
        watchOut: '不被注意时动力下降，过度依赖外部认可'
    },
    '意义': {
        icon: '✨',
        name: '意义驱动',
        desc: '追求内心价值',
        behaviors: ['在意事情的意义', '追求内在满足', '关注长期价值'],
        bestScenarios: ['价值观匹配的工作', '社会影响力项目', '创造性工作'],
        watchOut: '可能忽视现实约束，过于理想化'
    }
};

// 角色类型定义
const roleTypes = {
    '战略家': {
        avatar: '🏗️',
        image: 'role-strategist.png',
        themes: ['系统', '分析', '专注', '成就', '搜集'],
        tagline: '你喜欢把事情理清楚、搭好框架，让复杂变有序，是大家眼里的"靠谱担当"。',
        domainScores: { strategic_thinking: 85, execution: 78, influence: 52, relationship: 45 }
    },
    '探索者': {
        avatar: '🔭',
        image: 'role-explorer.png',
        themes: ['搜集', '分析', '意义', '专注', '共情'],
        tagline: '你充满好奇心，喜欢探索新事物，对世界有着永不满足的求知欲。',
        domainScores: { strategic_thinking: 82, execution: 45, influence: 48, relationship: 65 }
    },
    '行动派': {
        avatar: '⚡',
        image: 'role-doer.png',
        themes: ['执行', '成就', '系统', '专注', '分析'],
        tagline: '你是结果导向的行动派，能把想法快速落地，是团队里最可靠的推进器。',
        domainScores: { strategic_thinking: 65, execution: 92, influence: 70, relationship: 38 }
    },
    '连接者': {
        avatar: '🤝',
        image: 'role-connector.png',
        themes: ['共情', '搜集', '意义', '分析', '执行'],
        tagline: '你善于理解他人、建立连接，是团队的温暖核心和精神纽带。',
        domainScores: { strategic_thinking: 58, execution: 52, influence: 62, relationship: 88 }
    }
};

// 计算测评结果
function calculateResults() {
    const scores = {};
    
    // 初始化所有主题分数
    Object.keys(themeData).forEach(theme => {
        scores[theme] = 0;
    });
    
    // 统计答题结果
    answers.forEach(answer => {
        if (answer.theme) {
            scores[answer.theme] += 1;
        }
    });
    
    // 排序获取 TOP 5
    const sortedThemes = Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([theme, score]) => ({ theme, score }));
    
    // 确定角色类型
    let roleType = '战略家';
    if (topTheme === '搜集') roleType = '探索者';
    else if (topTheme === '执行') roleType = '行动派';
    else if (topTheme === '共情') roleType = '连接者';
    
    return {
        top5: sortedThemes,
        roleType: roleType,
        allScores: scores
    };
}

// 完成答题
function finishQuiz() {
    goToPage('loading');
    
    // 计算结果
    const results = calculateResults();
    
    // 模拟分析时间
    setTimeout(() => {
        generateReport(results);
        // 先进入角色概览
        goToPage('report-role');
        // 初始化对话
        setTimeout(() => {
            initFiveWhyDialog();
            setupInputListener();
        }, 300);
    }, 2000);
}

// 生成报告
function generateReport(results) {
    currentResults = results;
    
    // 更新角色概览
    const role = roleTypes[results.roleType];
    
    // 设置角色图片
    const roleImg = document.getElementById('role-img');
    if (roleImg && role.image) {
        roleImg.src = role.image;
        roleImg.alt = results.roleType;
    }
    
    // 设置角色标签
    const roleBadge = document.getElementById('role-badge');
    if (roleBadge) {
        roleBadge.textContent = '你的天赋类型';
    }
    
    document.getElementById('role-name').textContent = results.roleType;
    document.getElementById('role-desc').textContent = role.tagline;
    
    // 生成TOP 5天赋卡片
    generateTopTalents(results.top5);
    
    // 更新维度详情
    updateDimensionsDetail(results);
    
    // 生成天赋详解
    generateThemeDetails(results.top5);
    
    // 生成礼物与挑战
    generateGiftsAndChallenges(results.top5);
    
    // 生成温柔建议
    generateSuggestions(results.top5);
}

// 生成TOP 5天赋卡片
function generateTopTalents(top5) {
    const container = document.getElementById('top-talents');
    if (!container) return;
    
    container.innerHTML = top5.map((item, index) => {
        const info = themeData[item.theme];
        const rank = index + 1;
        const rankClass = rank <= 2 ? `rank-${rank}` : '';
        return `
            <div class="talent-chip ${rankClass}">
                <span class="chip-icon">${info.icon}</span>
                <span>${info.name}</span>
            </div>
        `;
    }).join('');
}

// 更新维度详情
function updateDimensionsDetail(results) {
    const scores = calculateDimensionScores();
    const top5Themes = results.top5.map(t => t.theme);
    
    // 维度配置
    const dimensions = [
        {
            name: '战略思维',
            icon: '🧠',
            score: scores.strategic_thinking,
            themes: ['搜集', '专注', '分析'],
            themeNames: ['广度涉猎', '深度死磕', '逻辑推演']
        },
        {
            name: '执行力',
            icon: '⚡',
            score: scores.execution,
            themes: ['系统', '执行'],
            themeNames: ['系统构建', '执行力']
        },
        {
            name: '影响力',
            icon: '🌟',
            score: scores.influence,
            themes: ['成就'],
            themeNames: ['成就驱动']
        },
        {
            name: '关系建立',
            icon: '💝',
            score: scores.relationship,
            themes: ['共情', '意义'],
            themeNames: ['情绪感知', '意义驱动']
        }
    ];
    
    // 按分数排序
    dimensions.sort((a, b) => b.score - a.score);
    
    // 生成维度详情HTML
    const container = document.getElementById('dimensions-detail');
    if (container) {
        container.innerHTML = dimensions.map((dim, index) => {
            // 找出该维度中用户拥有的天赋
            const userTalents = [];
            dim.themes.forEach((theme, i) => {
                if (top5Themes.includes(theme)) {
                    const themeInfo = themeData[theme];
                    userTalents.push({
                        theme: theme,
                        name: dim.themeNames[i],
                        rank: top5Themes.indexOf(theme) + 1,
                        desc: themeInfo.desc,
                        behaviors: themeInfo.behaviors.slice(0, 2) // 只取前2个行为特征
                    });
                }
            });
            
            const isTopDimension = index === 0;
            const borderStyle = isTopDimension ? '2px solid var(--primary)' : '1px solid var(--border)';
            const bgStyle = isTopDimension ? 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)' : 'var(--white)';
            
            if (userTalents.length === 0) {
                return '';
            }
            
            return `
                <div class="dimension-item" style="border: ${borderStyle}; background: ${bgStyle};">
                    <div class="dimension-header">
                        <span class="dimension-icon">${dim.icon}</span>
                        <div class="dimension-info">
                            <span class="dimension-name">${dim.name}</span>
                            <span class="dimension-score">${dim.score}分</span>
                        </div>
                    </div>
                    <div class="dimension-talents-detail">
                        ${userTalents.map(t => `
                            <div class="talent-detail-item">
                                <div class="talent-name-row">
                                    <span class="talent-tag rank-${t.rank}">${t.name}</span>
                                    <span class="talent-desc">${t.desc}</span>
                                </div>
                                <ul class="talent-behaviors">
                                    ${t.behaviors.map(b => `<li>${b}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    // 更新雷达图图例
    const legendContainer = document.getElementById('radar-legend');
    if (legendContainer) {
        legendContainer.innerHTML = dimensions.map(dim => `
            <div class="legend-item">
                <span class="dot" style="background:${getDimensionColor(dim.name)}"></span>
                <span>${dim.name} ${dim.score}分</span>
            </div>
        `).join('');
    }
}

// 获取维度颜色
function getDimensionColor(name) {
    const colors = {
        '战略思维': '#60a5fa',
        '执行力': '#93c5fd',
        '影响力': '#bfdbfe',
        '关系建立': '#dbeafe'
    };
    return colors[name] || '#94a3b8';
}

// 更新雷达图数据
function updateRadarData(scores) {
    // 更新图例
    const legendItems = document.querySelectorAll('.radar-legend .legend-item span:last-child');
    if (legendItems[0]) legendItems[0].textContent = `战略思维 ${scores.strategic_thinking}分`;
    if (legendItems[1]) legendItems[1].textContent = `执行力 ${scores.execution}分`;
    if (legendItems[2]) legendItems[2].textContent = `影响力 ${scores.influence}分`;
    if (legendItems[3]) legendItems[3].textContent = `关系建立 ${scores.relationship}分`;
}

// 生成天赋详解
function generateThemeDetails(top5) {
    const container = document.getElementById('theme-detail-list');
    if (!container) return;
    
    container.innerHTML = top5.slice(0, 3).map((item, index) => {
        const data = themeData[item.theme];
        return `
            <div class="theme-item">
                <div class="theme-header">
                    <span class="theme-rank">#${index + 1}</span>
                    <span class="theme-icon">${data.icon}</span>
                    <h4>${data.name}</h4>
                </div>
                <p class="theme-desc"><strong>${data.desc}</strong></p>
                
                <div class="theme-section">
                    <h5>典型表现</h5>
                    <ul>
                        ${data.behaviors.map(b => `<li>${b}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="theme-section">
                    <h5>适合场景</h5>
                    <ul>
                        ${data.bestScenarios.map(s => `<li>✅ ${s}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="theme-watchout">
                    <h5>💡 小提醒</h5>
                    <p>${data.watchOut}</p>
                </div>
            </div>
        `;
    }).join('<hr class="theme-divider">');
}

// 生成礼物与挑战
function generateGiftsAndChallenges(top5) {
    const topThemeNames = top5.map(t => t.theme);
    const giftsList = document.getElementById('gifts-list');
    const challengesList = document.getElementById('challenges-list');
    
    if (!giftsList || !challengesList) return;
    
    // 根据 TOP 天赋生成礼物
    const gifts = [];
    
    if (topThemeNames.includes('系统') && topThemeNames.includes('分析')) {
        gifts.push('系统构建 + 分析的组合让你成为团队里的"问题拆解专家"。别人看到一个烂摊子，你看到的已经是分类好的模块和解决路径。');
    }
    
    if (topThemeNames.includes('专注') && topThemeNames.includes('成就')) {
        gifts.push('专注 + 成就驱动的组合让你是"结果导向的执行者"。不仅能埋头做事，还能确保事情有交代、有成果。');
    }
    
    if (topThemeNames.includes('搜集')) {
        gifts.push('广度涉猎给你的系统思维提供了丰富的素材库。你能把 A 领域的方法论迁移到 B 领域，这是你的隐藏优势。');
    }
    
    if (topThemeNames.includes('共情')) {
        gifts.push('情绪感知让你成为团队里的"氛围调节器"，能敏锐察觉他人的需求和情绪变化。');
    }
    
    if (topThemeNames.includes('执行')) {
        gifts.push('强大的执行力让你是团队里的"定心丸"，说到做到，靠谱担当。');
    }
    
    // 默认礼物
    if (gifts.length === 0) {
        gifts.push('你的天赋组合独特，在合适的场景下能发挥出色。');
    }
    
    // 生成挑战
    const challenges = [];
    
    if (topThemeNames.includes('系统') && topThemeNames.includes('搜集')) {
        challenges.push('当系统构建遇上广度涉猎，你容易陷入"资料收集 → 整理框架 → 发现新领域 → 再收集"的循环，导致真正动手的时间被压缩。');
    }
    
    if (topThemeNames.includes('成就') && topThemeNames.includes('专注')) {
        challenges.push('你会很在意"这件事做成能不能被看到"，如果感觉没人关注，可能连开始的动力都没有。');
    }
    
    if (!topThemeNames.includes('共情')) {
        challenges.push('关系建立维度偏弱，在追求效率和结果时，可能会忽略同事的情绪和关系维护，让人觉得你有点"冷"。');
    }
    
    if (!topThemeNames.includes('执行')) {
        challenges.push('执行力不是你最突出的天赋，有时候想得太多、规划太久，反而迟迟不开始。');
    }
    
    // 默认挑战
    if (challenges.length === 0) {
        challenges.push('注意平衡你的优势，避免过度依赖某个天赋而忽略其他方面的发展。');
    }
    
    giftsList.innerHTML = gifts.map(g => `<div class="gift-item">${g}</div>`).join('');
    challengesList.innerHTML = challenges.map(c => `<div class="challenge-item">${c}</div>`).join('');
}

// 生成温柔建议
function generateSuggestions(top5) {
    const topThemeNames = top5.map(t => t.theme);
    const leverageList = document.getElementById('suggestions-leverage');
    const balanceList = document.getElementById('suggestions-balance');
    const growthList = document.getElementById('suggestions-growth');
    
    if (!leverageList || !balanceList || !growthList) return;
    
    // 发挥天赋的建议
    const leverageSuggestions = [];
    
    if (topThemeNames.includes('系统')) {
        leverageSuggestions.push('主动承担流程设计：团队需要新流程时，你就是最佳人选');
        leverageSuggestions.push('可视化你的思考：多画思维导图、流程图，让大家跟上你的思路');
        leverageSuggestions.push('允许"足够好"：80分的系统比100分的计划更有价值');
    }
    
    if (topThemeNames.includes('分析')) {
        leverageSuggestions.push('做团队的"逻辑守门员"：在决策前帮助大家梳理清楚思路');
        leverageSuggestions.push('用数据说话：在汇报时多用数据和逻辑支撑你的观点');
    }
    
    if (topThemeNames.includes('搜集')) {
        leverageSuggestions.push('成为知识枢纽：主动分享你收集到的有价值信息');
        leverageSuggestions.push('建立个人知识库：把碎片信息系统化整理');
    }
    
    // 平衡矛盾的建议
    const balanceSuggestions = [];
    
    if (topThemeNames.includes('搜集') && topThemeNames.includes('专注')) {
        balanceSuggestions.push('战略选点：选定1-2个真正感兴趣的方向深耕，其他的保持轻松涉猎');
        balanceSuggestions.push('试试单点突破：给自己一个小实验，比如"这个季度只专注一个技能"');
        balanceSuggestions.push('重新定义"被看见"：你的价值不只是"知道很多"，"在一件事上有洞见"同样闪闪发光');
    }
    
    if (topThemeNames.includes('成就')) {
        balanceSuggestions.push('听听内心的声音：问问自己"如果没人知道，我还会想做吗？"');
        balanceSuggestions.push('给自己鼓掌：设置一些属于自己的小里程碑');
        balanceSuggestions.push('试试纯粹的事：偶尔做一些只是为了开心、不计结果的事');
    }
    
    // 成长方向
    const growthSuggestions = [
        '🌱 练习接受"不确定"和"没条理"，不是所有事情都需要系统',
        '🌱 探索"不被看见时的动力"，找到内在驱动的火花',
        '🌱 允许自己"只想不做"一段时间，休息也是成长的一部分'
    ];
    
    leverageList.innerHTML = leverageSuggestions.map(s => `<li>${s}</li>`).join('');
    balanceList.innerHTML = balanceSuggestions.map(s => `<li>${s}</li>`).join('') || '<li>你的天赋组合比较平衡，继续保持～</li>';
    growthList.innerHTML = growthSuggestions.map(s => `<li>${s}</li>`).join('');
}

// 5Why 对话状态
let fiveWhyState = {
    currentRound: 0,
    answers: [],
    conversationPath: 'contradiction', // 'contradiction' | 'achievement' | 'meaning'
    isComplete: false
};

// 动态 5Why 对话系统
const dynamic5Why = {
    // 根据答题结果分析用户的模式
    analyzePattern: (answers) => {
        const themeCounts = {};
        answers.forEach(a => {
            themeCounts[a.theme] = (themeCounts[a.theme] || 0) + 1;
        });
        
        const patterns = [];
        
        const topThemes = Object.entries(themeCounts)
            .filter(([_, count]) => count >= 4)
            .map(([theme, _]) => theme);
        
        if (topThemes.length === 1) {
            patterns.push({
                type: 'strength',
                theme: topThemes[0],
                description: `${themeData[topThemes[0]].name}特别突出`
            });
        }
        
        const strongThemes = Object.entries(themeCounts)
            .filter(([_, count]) => count >= 3)
            .map(([theme, _]) => theme);
        
        if (strongThemes.length >= 2) {
            const contradictions = [
                ['搜集', '专注'],
                ['系统', '执行'],
                ['成就', '意义'],
                ['分析', '共情']
            ];
            for (const [t1, t2] of contradictions) {
                if (strongThemes.includes(t1) && strongThemes.includes(t2)) {
                    patterns.push({
                        type: 'contradiction',
                        themes: [t1, t2],
                        description: `${themeData[t1].name}与${themeData[t2].name}的拉扯`
                    });
                }
            }
        }
        
        if (patterns.length === 0) {
            const strongestTheme = Object.entries(themeCounts)
                .sort((a, b) => b[1] - a[1])[0][0];
            patterns.push({
                type: 'strength',
                theme: strongestTheme,
                description: `${themeData[strongestTheme].name}是你的核心天赋`
            });
        }
        
        return patterns;
    },
    
    // 分析用户回答的情感/话题倾向
    analyzeResponse: (text, allAnswers) => {
        const analysis = {
            sentiment: 'neutral',
            topics: [],
            keyWords: []
        };
        
        // 情感分析
        const positiveWords = ['享受', '满足', '喜欢', '快乐', '开心', '充实', '成就', '自信', '擅长', '自然', '舒服', '热爱', '期待', '珍惜'];
        const negativeWords = ['纠结', '焦虑', '害怕', '担心', '累', '压力', '迷茫', '矛盾', '挣扎', '痛苦', '疲惫', '烦躁', '后悔'];
        const ambivalentWords = ['有时候', '但也', '虽然', '不过', '偶尔', '还行', '还好', '看情况'];
        
        let posCount = 0, negCount = 0, ambCount = 0;
        positiveWords.forEach(w => { if (text.includes(w)) posCount++; });
        negativeWords.forEach(w => { if (text.includes(w)) negCount++; });
        ambivalentWords.forEach(w => { if (text.includes(w)) ambCount++; });
        
        if (posCount > negCount && posCount > ambCount) analysis.sentiment = 'positive';
        else if (negCount > posCount && negCount > ambCount) analysis.sentiment = 'negative';
        else if (ambCount > 0) analysis.sentiment = 'ambivalent';
        
        // 话题分析
        if (text.includes('价值') || text.includes('认可') || text.includes('被看见') || text.includes('证明')) {
            analysis.topics.push('validation');
            analysis.keyWords.push('认可');
        }
        if (text.includes('安全') || text.includes('稳定') || text.includes('确定') || text.includes('踏实')) {
            analysis.topics.push('security');
            analysis.keyWords.push('安全感');
        }
        if (text.includes('完美') || text.includes('做好') || text.includes('怕做错') || text.includes('害怕失败')) {
            analysis.topics.push('perfectionism');
            analysis.keyWords.push('完美');
        }
        if (text.includes('别人') || text.includes('比较') || text.includes('落后') || text.includes('不如')) {
            analysis.topics.push('comparison');
            analysis.keyWords.push('比较');
        }
        if (text.includes('从小') || text.includes('小时候') || text.includes('以前') || text.includes('一直')) {
            analysis.topics.push('childhood');
            analysis.keyWords.push('早期经历');
        }
        if (text.includes('习惯') || text.includes('自然而然') || text.includes('没想过') || text.includes('没注意')) {
            analysis.topics.push('autopilot');
            analysis.keyWords.push('惯性');
        }
        if (text.includes('希望') || text.includes('想要') || text.includes('渴望') || text.includes('向往')) {
            analysis.topics.push('aspiration');
            analysis.keyWords.push('渴望');
        }
        
        // 累积话题
        if (allAnswers) {
            const prevAnalysis = dynamic5Why._cumulativeTopics || {};
            analysis.topics.forEach(t => { prevAnalysis[t] = (prevAnalysis[t] || 0) + 1; });
            dynamic5Why._cumulativeTopics = prevAnalysis;
        }
        
        return analysis;
    },
    
    // 获取累积话题
    getCumulativeTopics: () => {
        return dynamic5Why._cumulativeTopics || {};
    },
    
    // 重置累积话题
    resetCumulativeTopics: () => {
        dynamic5Why._cumulativeTopics = {};
    },
    
    // 根据模式生成开场白
    generateIntro: (patterns) => {
        const pattern = patterns[0];
        
        if (pattern.type === 'strength') {
            const data = themeData[pattern.theme];
            return `我注意到你的测评结果中，${data.name}特别突出——${data.desc}。这让你${data.behaviors[0]}，这种特质在你身上表现得很明显～能跟你聊聊这个吗？`;
        } else if (pattern.type === 'contradiction') {
            const [t1, t2] = pattern.themes;
            const data1 = themeData[t1];
            const data2 = themeData[t2];
            return `我注意到你在测评中有一个很妙的模式——你既会${data1.desc}，又会${data2.desc}。这两种力量在你身上和谐共存，也挺有意思的～想跟你聊聊这个发现？`;
        }
        
        return '我注意到你的测评结果中有一些很有意思的模式，想跟你聊聊～';
    },
    
    // 递进式提问：每轮问题都基于用户上一轮的真实回答
    generateNextQuestion: (pattern, answers, round) => {
        const lastAnswer = answers[answers.length - 1] || '';
        const allAnswers = answers.join(' ');
        const analysis = dynamic5Why.analyzeResponse(lastAnswer, allAnswers);
        const cumulativeTopics = dynamic5Why.getCumulativeTopics();
        
        // 引用用户上一轮的回答（提取关键短语）
        const quoteUser = (maxLen) => {
            if (!lastAnswer) return '';
            let quote = lastAnswer;
            if (maxLen && quote.length > maxLen) quote = quote.substring(0, maxLen) + '...';
            return `你说"${quote}"——`;
        };
        
        // === 第一轮：探索感受 ===
        if (round === 0) {
            dynamic5Why.resetCumulativeTopics();
            if (pattern.type === 'strength') {
                const data = themeData[pattern.theme];
                return {
                    question: `当你${data.behaviors[0]}的时候，那种感觉是什么样的？可以多说一点吗～`,
                    quickReplies: ['感觉很投入很享受，时间过得特别快', '会有一种"对了，这就是我"的确认感', '其实挺累的，但就是停不下来', '好像也没特别想，就是自然而然会这样']
                };
            } else if (pattern.type === 'contradiction') {
                const [t1, t2] = pattern.themes;
                return {
                    question: `当${themeData[t1].desc}和${themeData[t2].desc}这两种声音同时出现的时候，心里是什么感受？`,
                    quickReplies: ['会纠结，不知道该听哪个', '其实挺有意思的，感觉自己很丰富', '有时候会焦虑，怕顾此失彼', '看具体场景，不同时候倾向不同']
                };
            }
        }
        
        // === 第二轮：深挖动机（基于第一轮回答） ===
        if (round === 1) {
            if (analysis.sentiment === 'positive') {
                const refWord = analysis.keyWords[0] || '这种感觉';
                return {
                    question: `${quoteUser(30)}听起来${refWord}对你来说挺重要的。能说说这种"对了"的感觉，在什么时刻尤其强烈吗？`,
                    quickReplies: ['完成一件有挑战的事之后', '被别人认可或感谢的时候', '自己独处安静下来时', '好像不一定，随心情']
                };
            } else if (analysis.sentiment === 'negative') {
                return {
                    question: `${quoteUser(30)}听起来那种拉扯的感觉不太舒服。如果有机会让它变得轻松一点，你觉得最需要什么？`,
                    quickReplies: ['希望有人告诉我不用急', '需要更清楚自己要什么', '想学会接受不完美', '可能只是时间问题']
                };
            } else {
                return {
                    question: `${quoteUser(30)}你说得挺真实的。如果往回看，有没有某个时刻让你特别清晰地感受到这件事对你的影响？`,
                    quickReplies: ['有一次印象特别深', '好像一直都有，很早就这样了', '某次比较大的变化之后', '说不上来，但确实存在']
                };
            }
        }
        
        // === 第三轮：探索信念/意义层 ===
        if (round === 2) {
            if (analysis.topics.includes('validation')) {
                return {
                    question: `${quoteUser(35)}我感觉到你很在意被认可和肯定。如果暂时没人看到你的努力，那种状态对你来说是什么感觉？`,
                    quickReplies: ['会有点失落，动力会下降', '其实还好，我自己知道就行', '会怀疑是不是做得不够好', '就想做得更好让人看到']
                };
            } else if (analysis.topics.includes('security')) {
                return {
                    question: `${quoteUser(35)}你提到了"踏实"或"确定"的感觉，这种安全感为什么对你这么重要呢？`,
                    quickReplies: ['不确定的状态让我很不安', '有安全感才能放心做事', '习惯了一切在掌控中', '可能是性格使然吧']
                };
            } else if (analysis.topics.includes('perfectionism')) {
                return {
                    question: `${quoteUser(35)}追求把事情做好当然是好事。但有没有"足够好"和"完美"之间的那个平衡点，你是怎么看这个的？`,
                    quickReplies: ['确实很难把握，总是想再改改', '慢慢在学会放手了', '我觉得完美就是标准', '看事情的优先级，分情况']
                };
            } else if (analysis.topics.includes('comparison')) {
                return {
                    question: `${quoteUser(35)}你提到了和别人比较。这种比较是让你更有动力，还是更多是压力？`,
                    quickReplies: ['更多是动力，但也累', '主要是压力，但又改不掉', '是一种参考，不会太当真', '以前在意，现在越来越少了']
                };
            } else {
                return {
                    question: `${quoteUser(38)}如果想象一下你内心最自由的状态——没有任何外在要求，就只是你自己——那会是什么样的？`,
                    quickReplies: ['做自己真正想做的事', '不用在意别人怎么看', '既有目标又不着急', '能接受各种状态的自己']
                };
            }
        }
        
        // === 第四轮：追溯根源 ===
        if (round === 3) {
            if (cumulativeTopics['validation'] >= 2) {
                return {
                    question: `${quoteUser(35)}你多次提到认可和被看见。这种"想要被看见"的愿望，你最早是什么时候意识到的？`,
                    quickReplies: ['小时候被表扬的印象很深', '学生时代成绩被关注', '工作后开始在意', '一直都有，但最近才意识到']
                };
            } else if (cumulativeTopics['security'] >= 2) {
                return {
                    question: `${quoteUser(35)}你反复提到对确定感的在意。回顾一下，这种模式是什么时候开始在你生活中出现的？`,
                    quickReplies: ['可能是成长环境影响的', '经历过变动之后才开始', '性格里天生就有', '不太确定，但挺明显的']
                };
            } else if (cumulativeTopics['comparison'] >= 2) {
                return {
                    question: `${quoteUser(35)}比较成了一种习惯。这种习惯的源头，你能追溯到人生的哪个阶段吗？`,
                    quickReplies: ['从小就被拿来和别人比', '工作以后竞争环境的影响', '自己对自己的要求', '社会大环境就是这样']
                };
            } else if (analysis.topics.includes('childhood')) {
                return {
                    question: `${quoteUser(35)}你提到了小时候。那段经历中，有没有一个画面或瞬间让你到现在还会想起来？`,
                    quickReplies: ['有一个场景特别清晰', '更多的是整体的感觉', '不太记得具体的事', '有，但不太想说']
                };
            } else {
                return {
                    question: `${quoteUser(38)}聊了这么多，你觉得这些模式在你人生的哪个阶段留下的痕迹最深？`,
                    quickReplies: ['小时候家庭的影响', '某段重要的工作经历', '某个重要的人或事', '不太确定，慢慢形成的']
                };
            }
        }
        
        // === 第五轮：整合与反思 ===
        if (round === 4) {
            if (cumulativeTopics['aspiration'] >= 2 || analysis.topics.includes('aspiration')) {
                return {
                    question: `${quoteUser(38)}聊到这里，我想问一个更整体的问题——如果把你刚才描述的这些串起来，你觉得它们在一起构成了一个什么样的"你"？`,
                    quickReplies: ['一个努力想要更好的人', '一个内心很丰富的人', '一个还在探索中的人', '一个知道自己要什么的人']
                };
            } else if (analysis.topics.includes('autopilot')) {
                return {
                    question: `${quoteUser(35)}你提到很多事好像"自然而然"。那如果给你一个机会，有意识地重新选择一种活法，你会保留什么，改变什么？`,
                    quickReplies: ['保留这份踏实和专注', '想给自己多一点放松', '会少在意别人的看法', '其实现在这样就挺好']
                };
            } else {
                return {
                    question: `${quoteUser(38)}谢谢你愿意和我聊这些。最后想问你——如果用一个词或一句话来总结你对自己的这个发现，你会怎么形容？`,
                    quickReplies: ['原来我一直在寻找确认', '我比想象中更丰富', '这些拉扯也是我的一部分', '还没想好，但开始看到了']
                };
            }
        }
        
        return {
            question: '还有什么是你想分享的吗？',
            quickReplies: ['没有了，谢谢你', '我还想补充一点', '这让我想到另外一件事']
        };
    },
    
    // 生成洞察总结
    generateInsights: (pattern, answers) => {
        const allAnswers = answers.join(' ');
        const cumulativeTopics = dynamic5Why.getCumulativeTopics();
        
        let path = [];
        let impacts = [];
        let finalMessage = [];
        
        // 根据实际对话内容构建发现路径
        path = ['注意到了某种模式'];
        if (cumulativeTopics['validation'] >= 2) path.push('渴望被认可和看见');
        if (cumulativeTopics['security'] >= 2) path.push('追求确定感和掌控');
        if (cumulativeTopics['comparison'] >= 1) path.push('习惯在比较中定位自己');
        if (cumulativeTopics['perfectionism'] >= 1) path.push('对"足够好"有很高标准');
        if (cumulativeTopics['aspiration'] >= 1) path.push('内心有期待和渴望');
        if (cumulativeTopics['autopilot'] >= 1) path.push('很多模式在惯性中运行');
        if (cumulativeTopics['childhood'] >= 1) path.push('与早期经历有关联');
        
        // 补充具体来源
        if (allAnswers.includes('从小') || allAnswers.includes('小时候')) path.unshift('源于早期的经历');
        if (allAnswers.includes('工作') || allAnswers.includes('社会')) path.unshift('在职场/社会中强化');
        
        if (path.length < 3) path = ['察觉到了某种倾向', '持续发挥着影响', '形成了独特的模式'];
        
        // 影响分析
        impacts = [];
        if (pattern.type === 'strength') {
            const data = themeData[pattern.theme];
            impacts.push(`在${data.name}方面有天然的优势和投入`);
            if (cumulativeTopics['validation'] >= 1) impacts.push('对他人认可的敏感既是动力也带来压力');
            if (cumulativeTopics['perfectionism'] >= 1) impacts.push('高标准有时让行动变慢，但也保证了品质');
            impacts.push('这份特质让你在某些领域比别人走得更深');
        } else if (pattern.type === 'contradiction') {
            const [t1, t2] = pattern.themes;
            impacts.push(`同时具有${themeData[t1].name}和${themeData[t2].name}让你更全面`);
            impacts.push('两种力量拉扯时可能消耗精力，但也让你视角更丰富');
            if (cumulativeTopics['validation'] >= 1) impacts.push('在意外界评价，让内在矛盾更加明显');
        }
        if (impacts.length < 2) {
            impacts.push('你的自我觉察本身就是一种力量');
            impacts.push('看到模式，就是改变的开始');
        }
        
        // 最终信息
        if (cumulativeTopics['validation'] >= 2) {
            finalMessage = [
                '你渴望被看见、被认可——这完全不是弱点。',
                '恰恰相反，这说明你内心有一种"想要做得好"的认真和热忱。只是别忘了，在你被任何人看见之前，你已经足够值得被珍视了 ✨'
            ];
        } else if (cumulativeTopics['security'] >= 2) {
            finalMessage = [
                '追求确定感并不是软弱，而是一种对生活认真的态度。',
                '只是有时候，最美的风景恰恰藏在那些不确定的转角里。偶尔放手，也许会有意外惊喜 ✨'
            ];
        } else if (pattern.type === 'contradiction') {
            finalMessage = [
                '你身上那些看似矛盾的地方，恰恰是你最独特的财富。',
                '不用急着二选一。学会让它们在你体内和谐共处，是你最温柔的智慧 ✨'
            ];
        } else {
            const data = pattern.type === 'strength' ? themeData[pattern.theme] : null;
            finalMessage = [
                data ? `你对${data.name}的投入，是一种珍贵的天赋。` : '你对自己的认识和敞开，本身就是一种勇气。',
                '无论你走到哪里，都记得——你的价值不只来自结果，更来自你一路上的真诚和认真 ✨'
            ];
        }
        
        return { path, impacts, finalMessage };
    }
};

// 初始化 5Why 对话
function initFiveWhyDialog() {
    // 分析用户的模式
    const patterns = dynamic5Why.analyzePattern(answers);
    const mainPattern = patterns[0];
    
    fiveWhyState = {
        currentRound: 0,
        answers: [],
        pattern: mainPattern,
        patterns: patterns,
        isComplete: false
    };
    
    const chatMessages = document.getElementById('chat-messages');
    
    // 清空之前的对话
    chatMessages.innerHTML = '';
    
    // 生成并添加开场白
    const intro = dynamic5Why.generateIntro(patterns);
    addSystemMessage(intro);
    
    // 显示第一个问题
    setTimeout(() => {
        showDynamicQuestion();
    }, 800);
}

// 显示动态生成的问题
function showDynamicQuestion() {
    const { pattern, currentRound, answers } = fiveWhyState;
    const qa = dynamic5Why.generateNextQuestion(pattern, answers, currentRound);
    
    addSystemMessage(qa.question);
    showQuickReplies(qa.quickReplies);
}

// 添加系统消息
function addSystemMessage(text) {
    const chatMessages = document.getElementById('chat-messages');
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble system';
    bubble.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 添加用户消息
function addUserMessage(text) {
    const chatMessages = document.getElementById('chat-messages');
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble user';
    bubble.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 显示快速回复选项
function showQuickReplies(replies) {
    const container = document.getElementById('quick-replies');
    container.innerHTML = '';
    
    replies.forEach(reply => {
        const btn = document.createElement('button');
        btn.className = 'quick-reply-btn';
        btn.textContent = reply;
        btn.onclick = () => selectReply(reply);
        container.appendChild(btn);
    });
}

// 选择快速回复
function selectReply(text) {
    addUserMessage(text);
    fiveWhyState.answers.push(text);
    fiveWhyState.currentRound++;
    
    // 隐藏快速回复
    document.getElementById('quick-replies').innerHTML = '';
    
    // 显示下一个问题或完成
    setTimeout(() => {
        if (fiveWhyState.currentRound < 5) {
            showDynamicQuestion();
        } else {
            completeDialog();
        }
    }, 600);
}

// 发送自定义消息
function sendMessage() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    
    if (!text || fiveWhyState.isComplete) return;
    
    addUserMessage(text);
    fiveWhyState.answers.push(text);
    fiveWhyState.currentRound++;
    input.value = '';
    
    setTimeout(() => {
        if (fiveWhyState.currentRound < 5) {
            showDynamicQuestion();
        } else {
            completeDialog();
        }
    }, 600);
}

// 完成对话
function completeDialog() {
    fiveWhyState.isComplete = true;
    
    const { pattern, answers } = fiveWhyState;
    const insights = dynamic5Why.generateInsights(pattern, answers);
    
    // 添加总结消息
    const chatMessages = document.getElementById('chat-messages');
    const summaryBubble = document.createElement('div');
    summaryBubble.className = 'chat-bubble system highlight';
    summaryBubble.innerHTML = `
        <p>💡 <strong>原来是这样呢～</strong></p>
        <p>谢谢你愿意分享这些。从你的回答中，我感受到${insights.path.join(' → ')}这样的模式。</p>
    `;
    chatMessages.appendChild(summaryBubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // 隐藏输入区域
    document.getElementById('quick-replies').style.display = 'none';
    document.querySelector('.text-input-wrapper').style.display = 'none';
    
    // 显示发现路径
    const pathFlow = document.getElementById('path-flow');
    pathFlow.innerHTML = insights.path.map((item, index) => `
        <span class="path-item">${item}</span>
        ${index < insights.path.length - 1 ? '<span class="arrow">→</span>' : ''}
    `).join('');
    document.getElementById('discovery-section').style.display = 'block';
    
    // 显示影响
    const impactList = document.getElementById('impact-list');
    impactList.innerHTML = insights.impacts.map(impact => `<li>${impact}</li>`).join('');
    document.getElementById('impact-section').style.display = 'block';
    
    // 显示最终消息
    document.getElementById('final-message-1').textContent = insights.finalMessage[0];
    document.getElementById('final-message-2').innerHTML = `<strong>${insights.finalMessage[1]}</strong>`;
    document.getElementById('message-section').style.display = 'block';
    
    // 显示继续按钮
    document.getElementById('continue-btn').style.display = 'block';
}

// 监听回车键发送
function setupInputListener() {
    const input = document.getElementById('user-input');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// 全局存储计算结果
let currentResults = null;

// 绘制雷达图（根据实际答题结果）
function drawRadarChart() {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;
    
    // 根据实际答题结果计算四个维度的分数
    const dimensionScores = calculateDimensionScores();
    
    const data = [
        { label: '战略思维', value: dimensionScores.strategic_thinking, color: '#60a5fa' },
        { label: '执行力', value: dimensionScores.execution, color: '#93c5fd' },
        { label: '影响力', value: dimensionScores.influence, color: '#bfdbfe' },
        { label: '关系建立', value: dimensionScores.relationship, color: '#dbeafe' }
    ];
    
    // 更新图例显示
    updateRadarLegend(data);
    
    const angles = data.map((_, i) => (Math.PI * 2 * i) / data.length - Math.PI / 2);
    
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制背景网格
    for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        const r = (radius * i) / 5;
        
        angles.forEach((angle, j) => {
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);
            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.stroke();
    }
    
    // 绘制轴线
    angles.forEach(angle => {
        ctx.beginPath();
        ctx.strokeStyle = '#e2e8f0';
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
        ctx.stroke();
    });
    
    // 绘制数据区域
    ctx.beginPath();
    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    
    data.forEach((d, i) => {
        const r = (radius * d.value) / 100;
        const x = centerX + r * Math.cos(angles[i]);
        const y = centerY + r * Math.sin(angles[i]);
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // 绘制数据点
    data.forEach((d, i) => {
        const r = (radius * d.value) / 100;
        const x = centerX + r * Math.cos(angles[i]);
        const y = centerY + r * Math.sin(angles[i]);
        
        ctx.beginPath();
        ctx.fillStyle = d.color;
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // 白色边框
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
    
    // 绘制标签
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'center';
    
    data.forEach((d, i) => {
        const labelR = radius + 25;
        const x = centerX + labelR * Math.cos(angles[i]);
        const y = centerY + labelR * Math.sin(angles[i]);
        ctx.fillText(d.label, x, y + 4);
    });
}

// 计算四个维度的分数
function calculateDimensionScores() {
    const themeCounts = {};
    answers.forEach(a => {
        themeCounts[a.theme] = (themeCounts[a.theme] || 0) + 1;
    });
    
    // 战略思维 = 搜集 + 专注 + 分析
    const strategic_thinking = Math.min(100, Math.round(
        ((themeCounts['搜集'] || 0) + (themeCounts['专注'] || 0) + (themeCounts['分析'] || 0)) / 6 * 100
    ));
    
    // 执行力 = 系统 + 执行
    const execution = Math.min(100, Math.round(
        ((themeCounts['系统'] || 0) + (themeCounts['执行'] || 0)) / 4 * 100
    ));
    
    // 影响力 = 成就
    const influence = Math.min(100, Math.round(
        ((themeCounts['成就'] || 0)) / 2 * 100
    ));
    
    // 关系建立 = 共情 + 意义
    const relationship = Math.min(100, Math.round(
        ((themeCounts['共情'] || 0) + (themeCounts['意义'] || 0)) / 4 * 100
    ));
    
    return { strategic_thinking, execution, influence, relationship };
}

// 更新雷达图图例
function updateRadarLegend(data) {
    const legendItems = document.querySelectorAll('.radar-legend .legend-item span:last-child');
    data.forEach((d, i) => {
        if (legendItems[i]) {
            legendItems[i].textContent = `${d.label} ${d.value}分`;
        }
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    goToPage('home');
});
