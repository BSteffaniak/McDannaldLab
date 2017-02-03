%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Written 9/22/2013 by Mike McDannald                                         %
% Finds suppression ratios for each cue, for each session, from specific rats % 
% Groups rats into similar conditions, for example: Control vs Lesion         %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

tic % start timer
clear all; % clear all variables

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%% Open file to be analyzed %%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fileList = dir('C:\Data\Split'); % Location of individual matlab files made by MedFileSplitter
fileList = fileList(~[fileList.isdir]);
[~, sortorder] = sort([fileList.datenum]);
fileList = fileList(sortorder); % Order files
numfiles = numel(fileList); % Get number of files

for ii = 1:numfiles
    
load(['C:\Data\Split\',fileList(ii).name]); % load first file
    
if(strcmp(program(1:4),'PR25')) && (strcmp(subject(end-1:end),'01')); % Get file using PR25 program, the first session '01'
       
   day = [subject(5:10), '_', program(1:4), '_', subject(end-1:end)];

   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   % Find suppression ratio for cue 100 %
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   
for iii = 1:length(time.cue100);
    
    base = time.cue100(iii,1) - 20; % 20-s prior to cue onset
    cueOn = time.cue100(iii,1); % cue onset
    cueOff = time.cue100(iii,1) + 10; % cue offset
    
    y = time.nosepoke; % variable with timestamp of each nose poke during session
    
    y1 = y(y>=base); % start of baseline period
    y2 = y(y<=cueOn); % end of baseline period
    t1 = intersect(y1,y2); % all nose pokes occuring between start and end
    
    raw.cue100.base(iii,1) = length(t1); % raw number of pokes during the baseline for each trial (later converted to a rate for the entire cue)
    
    clear y1 y2 t1; % housekeeping
    
    y1 = y(y>=cueOn); % start of cue period
    y2 = y(y<=cueOff); % end of cue period
    t1 = intersect(y1,y2); % all nose pokes occuring between start and end
    
    raw.cue100.cue(iii,1) = length(t1); % raw number of pokes during the cue for each trial (later converted to a rate for the entire cue)
    
    clear y1 y2 t1;

end

    rate.cue100.base = raw.cue100.base*3; % converting raw poke rate to poke/min (*3 because baseline period is 20 seconds)
    rate.cue100.cue = raw.cue100.cue*6; % converting raw poke rate to poke/min (*6 because cue period is 10 seconds)

    % calculate suppression ratios for different time periods 
    
    cer.cue100.cue(1,:) = (rate.cue100.base - rate.cue100.cue) ./ (rate.cue100.base + rate.cue100.cue); % suppression ratio for each trial
    
    % If a cer variable is NaN (not a number) make the value 1.0 (high fear)
    % This is uncommon but occurs when a rat has no baseline nosepokes
    
    cer.cue100.cue(isnan(cer.cue100.cue(1,:))) = 1;

   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   % Find suppression ratio for cue SPR %
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   
for iii = 1:length(time.cueSPR);
    
    base = time.cueSPR(iii,1) - 20; 
    cueOn = time.cueSPR(iii,1); 
    cueOff = time.cueSPR(iii,1) + 10; 
    
    y = time.nosepoke;
    
    y1 = y(y>=base);
    y2 = y(y<=cueOn);
    t1 = intersect(y1,y2);
    
    raw.cueSPR.base(iii,1) = length(t1);
    
    clear y1 y2 t1;
    
    y1 = y(y>=cueOn);
    y2 = y(y<=cueOff);
    t1 = intersect(y1,y2);
    
    raw.cueSPR.cue(iii,1) = length(t1);
    
    clear y1 y2 t1;

end

    rate.cueSPR.base = raw.cueSPR.base*3; 
    rate.cueSPR.cue = raw.cueSPR.cue*6; 

    % calculate suppression ratios for different time periods 
    
    cer.cueSPR.cue(1,:) = (rate.cueSPR.base - rate.cueSPR.cue) ./ (rate.cueSPR.base + rate.cueSPR.cue);
    cer.cueSPR.cue(isnan(cer.cueSPR.cue(1,:))) = 1;
    
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   % Find suppression ratio for cue NsPR %
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   
for iii = 1:length(time.cueNsPR);
    
    base = time.cueNsPR(iii,1) - 20; 
    cueOn = time.cueNsPR(iii,1); 
    cueOff = time.cueNsPR(iii,1) + 10; 
    
    y = time.nosepoke;
    
    y1 = y(y>=base);
    y2 = y(y<=cueOn);
    t1 = intersect(y1,y2);
    
    raw.cueNsPR.base(iii,1) = length(t1);
    
    clear y1 y2 t1;
    
    y1 = y(y>=cueOn);
    y2 = y(y<=cueOff);
    t1 = intersect(y1,y2);
    
    raw.cueNsPR.cue(iii,1) = length(t1);
    
    clear y1 y2 t1;

end

    rate.cueNsPR.base = raw.cueNsPR.base*3; 
    rate.cueNsPR.cue = raw.cueNsPR.cue*6; 
    
    % calculate suppression ratios for different time periods 
    
    cer.cueNsPR.cue(1,:) = (rate.cueNsPR.base - rate.cueNsPR.cue) ./ (rate.cueNsPR.base + rate.cueNsPR.cue);
    cer.cueNsPR.cue(isnan(cer.cueNsPR.cue(1,:))) = 1;
    
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   % Find suppression ratio for cue 0 %
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   
for iii = 1:length(time.cue0);
    
    base = time.cue0(iii,1) - 20;
    cueOn = time.cue0(iii,1);
    cueOff = time.cue0(iii,1) + 10; 
    
    y = time.nosepoke;
    
    y1 = y(y>=base);
    y2 = y(y<=cueOn);
    t1 = intersect(y1,y2);
    
    raw.cue0.base(iii,1) = length(t1);
    
    clear y1 y2 t1;
    
    y1 = y(y>=cueOn);
    y2 = y(y<=cueOff);
    t1 = intersect(y1,y2);
    
    raw.cue0.cue(iii,1) = length(t1);
    
    clear y1 y2 t1;

end

    rate.cue0.base = raw.cue0.base*3; 
    rate.cue0.cue = raw.cue0.cue*6; 

    % calculate suppression ratios for different time periods 
    
    cer.cue0.cue(1,:) = (rate.cue0.base - rate.cue0.cue) ./ (rate.cue0.base + rate.cue0.cue);
    cer.cue0.cue(isnan(cer.cue0.cue(1,:))) = 1;
    
    % calculate suppression ratios for PR cue
    
    cer.cuePR.cue = [cer.cueSPR.cue,cer.cueNsPR.cue];
    
% calculate group means for one groups of rats, for example Control rats

if    (strcmp(fileList(ii,1).name(1:4),'co01')) || ...
      (strcmp(fileList(ii,1).name(1:4),'co02')) || ...
      (strcmp(fileList(ii,1).name(1:4),'co03')) || ...
      (strcmp(fileList(ii,1).name(1:4),'co04')) || ...
      (strcmp(fileList(ii,1).name(1:4),'co05')) || ...
      (strcmp(fileList(ii,1).name(1:4),'co06')) || ...
      (strcmp(fileList(ii,1).name(1:4),'co07')) || ...
      (strcmp(fileList(ii,1).name(1:4),'co08'));  
  
hh = subject(3:4); % get the subject number
hh = str2num(hh); % make into a number from a string
con.Name(hh,1:4) = subject(1:4); % add subject to name list

% often there will be CER values of 0, add a '1' in the first column to tag it
% the '1' will later be removed once the empty rows have been deleted

con.cer.cue100.cue(hh,:) = [1,cer.cue100.cue(:,:)]; % data ordered by subject id starting with '01'
con.rate.cue100.base(hh,:) = [1,rate.cue100.base(:,:)']; 
con.cer.cueSPR.cue(hh,:) = [1,cer.cueSPR.cue(:,:)]; 
con.rate.cueSPR.base(hh,:) = [1,rate.cueSPR.base(:,:)'];
con.cer.cueNsPR.cue(hh,:) = [1,cer.cueNsPR.cue(:,:)]; 
con.rate.cueNsPR.base(hh,:) = [1,rate.cueNsPR.base(:,:)'];
con.cer.cue0.cue(hh,:) = [1,cer.cue0.cue(:,:)]; 
con.rate.cue0.base(hh,:) = [1,rate.cue0.base(:,:)'];
con.cer.cuePR.cue(hh,:) = [1,cer.cuePR.cue(:,:)];

% calculate group means for a separate group of rats, for example lesions
    
elseif(strcmp(fileList(ii,1).name(1:4),'le01')) || ...
      (strcmp(fileList(ii,1).name(1:4),'le02')) || ...
      (strcmp(fileList(ii,1).name(1:4),'le03')) || ...
      (strcmp(fileList(ii,1).name(1:4),'le04')) || ...
      (strcmp(fileList(ii,1).name(1:4),'le05')) || ...
      (strcmp(fileList(ii,1).name(1:4),'le06')) || ...
      (strcmp(fileList(ii,1).name(1:4),'le07')) || ...
      (strcmp(fileList(ii,1).name(1:4),'le08'));  
    
gg = subject(3:4);
gg = str2num(gg);
les.Name(gg,1:4) = subject(1:4);

les.cer.cue100.cue(gg,:) = [1,cer.cue100.cue(:,:)]; 
les.rate.cue100.base(gg,:) = [1,rate.cue100.base(:,:)']; 
les.cer.cueSPR.cue(gg,:) = [1,cer.cueSPR.cue(:,:)];
les.rate.cueSPR.base(gg,:) = [1,rate.cueSPR.base(:,:)'];
les.cer.cueNsPR.cue(gg,:) = [1,cer.cueNsPR.cue(:,:)]; 
les.rate.cueNsPR.base(gg,:) = [1,rate.cueNsPR.base(:,:)'];
les.cer.cue0.cue(gg,:) = [1,cer.cue0.cue(:,:)]; 
les.rate.cue0.base(gg,:) = [1,rate.cue0.base(:,:)'];
les.cer.cuePR.cue(gg,:) = [1,cer.cuePR.cue(:,:)];

else

end

end

end

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Delete empty rows in matrices %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

con.Name(all(abs(con.Name)<eps,2),:)=[];
les.Name(all(abs(les.Name)<eps,2),:)=[];

con.cer.cue100.cue(all(abs(con.cer.cue100.cue)<eps,2),:)=[];
con.rate.cue100.base(all(abs(con.rate.cue100.base)<eps,2),:)=[];
les.cer.cue100.cue(all(abs(les.cer.cue100.cue)<eps,2),:)=[];
les.rate.cue100.base(all(abs(les.rate.cue100.base)<eps,2),:)=[];

con.cer.cueSPR.cue(all(abs(con.cer.cueSPR.cue)<eps,2),:)=[];
con.rate.cueSPR.base(all(abs(con.rate.cueSPR.base)<eps,2),:)=[];
les.cer.cueSPR.cue(all(abs(les.cer.cueSPR.cue)<eps,2),:)=[];
les.rate.cueSPR.base(all(abs(les.rate.cueSPR.base)<eps,2),:)=[];

con.cer.cueNsPR.cue(all(abs(con.cer.cueNsPR.cue)<eps,2),:)=[];
con.rate.cueNsPR.base(all(abs(con.rate.cueNsPR.base)<eps,2),:)=[];
les.cer.cueNsPR.cue(all(abs(les.cer.cueNsPR.cue)<eps,2),:)=[];
les.rate.cueNsPR.base(all(abs(les.rate.cueNsPR.base)<eps,2),:)=[];

con.cer.cue0.cue(all(abs(con.cer.cue0.cue)<eps,2),:)=[];
con.rate.cue0.base(all(abs(con.rate.cue0.base)<eps,2),:)=[];
les.cer.cue0.cue(all(abs(les.cer.cue0.cue)<eps,2),:)=[];
les.rate.cue0.base(all(abs(les.rate.cue0.base)<eps,2),:)=[];

con.cer.cuePR.cue(all(abs(con.cer.cuePR.cue)<eps,2),:)=[];
les.cer.cuePR.cue(all(abs(les.cer.cuePR.cue)<eps,2),:)=[];

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Take out constant '1' from each variable %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

les.cer.cue100.cue = les.cer.cue100.cue(:,2:end);
les.rate.cue100.base = les.rate.cue100.base(:,2:end);
con.cer.cue100.cue = con.cer.cue100.cue(:,2:end);
con.rate.cue100.base = con.rate.cue100.base(:,2:end);

les.cer.cueSPR.cue = les.cer.cueSPR.cue(:,2:end);
les.rate.cueSPR.base = les.rate.cueSPR.base(:,2:end);
con.cer.cueSPR.cue = con.cer.cueSPR.cue(:,2:end);
con.rate.cueSPR.base = con.rate.cueSPR.base(:,2:end);

les.cer.cueNsPR.cue = les.cer.cueNsPR.cue(:,2:end);
les.rate.cueNsPR.base = les.rate.cueNsPR.base(:,2:end);
con.cer.cueNsPR.cue = con.cer.cueNsPR.cue(:,2:end);
con.rate.cueNsPR.base = con.rate.cueNsPR.base(:,2:end);

les.cer.cue0.cue = les.cer.cue0.cue(:,2:end);
les.rate.cue0.base = les.rate.cue0.base(:,2:end);
con.cer.cue0.cue = con.cer.cue0.cue(:,2:end);
con.rate.cue0.base = con.rate.cue0.base(:,2:end);

con.cer.cuePR.cue = con.cer.cuePR.cue(:,2:end);
les.cer.cuePR.cue = les.cer.cuePR.cue(:,2:end);

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Find trial by trial means for each group %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

les.cer.cue100.cueMeanTbt = mean(les.cer.cue100.cue);
les.rate.cue100.baseMeanTbt = mean(les.rate.cue100.base);
con.cer.cue100.cueMeanTbt = mean(con.cer.cue100.cue);
con.rate.cue100.baseMeanTbt = mean(con.rate.cue100.base);

les.cer.cueSPR.cueMeanTbt = mean(les.cer.cueSPR.cue);
les.rate.cueSPR.baseMeanTbt = mean(les.rate.cueSPR.base);
con.cer.cueSPR.cueMeanTbt = mean(con.cer.cueSPR.cue);
con.rate.cueSPR.baseMeanTbt = mean(con.rate.cueSPR.base);

les.cer.cueNsPR.cueMeanTbt = mean(les.cer.cueNsPR.cue);
les.rate.cueNsPR.baseMeanTbt = mean(les.rate.cueNsPR.base);
con.cer.cueNsPR.cueMeanTbt = mean(con.cer.cueNsPR.cue);
con.rate.cueNsPR.baseMeanTbt = mean(con.rate.cueNsPR.base);

les.cer.cue0.cueMeanTbt = mean(les.cer.cue0.cue);
les.rate.cue0.baseMeanTbt = mean(les.rate.cue0.base);
con.cer.cue0.cueMeanTbt = mean(con.cer.cue0.cue);
con.rate.cue0.baseMeanTbt = mean(con.rate.cue0.base);

con.cer.cuePR.cueMeanTbt = mean(con.cer.cuePR.cue);
les.cer.cuePR.cueMeanTbt = mean(les.cer.cuePR.cue);

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Find mean baseline for all trials %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

les.rate.baseAll = [les.rate.cue100.base,les.rate.cueSPR.base,les.rate.cueNsPR.base,les.rate.cue0.base];
con.rate.baseAll = [con.rate.cue100.base,con.rate.cueSPR.base,con.rate.cueNsPR.base,con.rate.cue0.base];

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Find session mean for all individuals %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

les.cer.cue100.cueMeanInd = mean(les.cer.cue100.cue,2);
les.rate.cue100.baseMeanInd = mean(les.rate.cue100.base,2);
con.cer.cue100.cueMeanInd = mean(con.cer.cue100.cue,2);
con.rate.cue100.baseMeanInd = mean(con.rate.cue100.base,2);

les.cer.cueSPR.cueMeanInd = mean(les.cer.cueSPR.cue,2);
les.rate.cueSPR.baseMeanInd = mean(les.rate.cueSPR.base,2);
con.cer.cueSPR.cueMeanInd = mean(con.cer.cueSPR.cue,2);
con.rate.cueSPR.baseMeanInd = mean(con.rate.cueSPR.base,2);

les.cer.cueNsPR.cueMeanInd = mean(les.cer.cueNsPR.cue,2);
les.rate.cueNsPR.baseMeanInd = mean(les.rate.cueNsPR.base,2);
con.cer.cueNsPR.cueMeanInd = mean(con.cer.cueNsPR.cue,2);
con.rate.cueNsPR.baseMeanInd = mean(con.rate.cueNsPR.base,2);

les.cer.cue0.cueMeanInd = mean(les.cer.cue0.cue,2);
les.rate.cue0.baseMeanInd = mean(les.rate.cue0.base,2);
con.cer.cue0.cueMeanInd = mean(con.cer.cue0.cue,2);
con.rate.cue0.baseMeanInd = mean(con.rate.cue0.base,2);

les.cer.cuePR.cueMeanInd = mean(les.cer.cuePR.cue,2);
con.cer.cuePR.cueMeanInd = mean(con.cer.cuePR.cue,2);

les.cer.cue100.cueMeanG = mean(les.cer.cue100.cueMeanInd);
les.rate.cue100.baseMeanG = mean(les.rate.cue100.baseMeanInd);
con.cer.cue100.cueMeanG = mean(con.cer.cue100.cueMeanInd);
con.rate.cue100.baseMeanG = mean(con.rate.cue100.baseMeanInd);

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Find session means for each group %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

les.cer.cueSPR.cueMeanG = mean(les.cer.cueSPR.cueMeanInd);
les.rate.cueSPR.baseMeanG = mean(les.rate.cueSPR.baseMeanInd);
con.cer.cueSPR.cueMeanG = mean(con.cer.cueSPR.cueMeanInd);
con.rate.cueSPR.baseMeanG = mean(con.rate.cueSPR.baseMeanInd);

les.cer.cueNsPR.cueMeanG = mean(les.cer.cueNsPR.cueMeanInd);
les.rate.cueNsPR.baseMeanG = mean(les.rate.cueNsPR.baseMeanInd);
con.cer.cueNsPR.cueMeanG = mean(con.cer.cueNsPR.cueMeanInd);
con.rate.cueNsPR.baseMeanG = mean(con.rate.cueNsPR.baseMeanInd);

les.cer.cue0.cueMeanG = mean(les.cer.cue0.cueMeanInd);
les.rate.cue0.baseMeanG = mean(les.rate.cue0.baseMeanInd);
con.cer.cue0.cueMeanG = mean(con.cer.cue0.cueMeanInd);
con.rate.cue0.baseMeanG = mean(con.rate.cue0.baseMeanInd);

les.cer.cuePR.cueMeanG = mean(les.cer.cuePR.cueMeanInd);
con.cer.cuePR.cueMeanG = mean(con.cer.cuePR.cueMeanInd);

les.rate.baseAllMeanInd = mean(les.rate.baseAll,2);
con.rate.baseAllMeanInd = mean(con.rate.baseAll,2);

%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Find sem of group means %
%%%%%%%%%%%%%%%%%%%%%%%%%%%

les.cer.cue100.cueSemG = std(les.cer.cue100.cueMeanInd)/sqrt(length((les.cer.cue100.cueMeanInd)-1));
les.rate.cue100.baseSemG = std(les.rate.cue100.baseMeanInd)/sqrt(length((les.cer.cue100.cueMeanInd)-1));
con.cer.cue100.cueSemG = std(con.cer.cue100.cueMeanInd)/sqrt(length((con.cer.cue100.cueMeanInd)-1));
con.rate.cue100.baseSemG = std(con.rate.cue100.baseMeanInd)/sqrt(length((con.cer.cue100.cueMeanInd)-1));

les.cer.cueSPR.cueSemG = std(les.cer.cueSPR.cueMeanInd)/sqrt(length((les.cer.cueSPR.cueMeanInd)-1));
les.rate.cueSPR.baseSemG = std(les.rate.cueSPR.baseMeanInd)/sqrt(length((les.cer.cueSPR.cueMeanInd)-1));
con.cer.cueSPR.cueSemG = std(con.cer.cueSPR.cueMeanInd)/sqrt(length((con.cer.cueSPR.cueMeanInd)-1));
con.rate.cueSPR.baseSemG = std(con.rate.cueSPR.baseMeanInd)/sqrt(length((con.cer.cueSPR.cueMeanInd)-1));

les.cer.cueNsPR.cueSemG = std(les.cer.cueNsPR.cueMeanInd)/sqrt(length((les.cer.cueNsPR.cueMeanInd)-1));
les.rate.cueNsPR.baseSemG = std(les.rate.cueNsPR.baseMeanInd)/sqrt(length((les.cer.cueNsPR.cueMeanInd)-1));
con.cer.cueNsPR.cueSemG = std(con.cer.cueNsPR.cueMeanInd)/sqrt(length((con.cer.cueNsPR.cueMeanInd)-1));
con.rate.cueNsPR.baseSemG = std(con.rate.cueNsPR.baseMeanInd)/sqrt(length((con.cer.cueNsPR.cueMeanInd)-1));

les.cer.cue0.cueSemG = std(les.cer.cue0.cueMeanInd)/sqrt(length((les.cer.cue0.cueMeanInd)-1));
les.rate.cue0.baseSemG = std(les.rate.cue0.baseMeanInd)/sqrt(length((les.cer.cue0.cueMeanInd)-1));
con.cer.cue0.cueSemG = std(con.cer.cue0.cueMeanInd)/sqrt(length((con.cer.cue0.cueMeanInd)-1));
con.rate.cue0.baseSemG = std(con.rate.cue0.baseMeanInd)/sqrt(length((con.cer.cue0.cueMeanInd)-1));

les.cer.cuePR.cueSemG = std(les.cer.cuePR.cueMeanInd)/sqrt(length((les.cer.cuePR.cueMeanInd)-1));
con.cer.cuePR.cueSemG = std(con.cer.cuePR.cueMeanInd)/sqrt(length((con.cer.cuePR.cueMeanInd)-1));

filename = ['C:\Data\Analyzed\',day]; % save all files from a single discrimination day, for example '01'
save(filename, 'les', 'con', 'day'); % filename and variables to be saved

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Make figure showing baseline poke rate of each individual %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

figure;

subplot (2,1,1);
axis([0.25 (length(con.rate.baseAllMeanInd)+.75) 0 160]);
x = 1:length(con.rate.baseAllMeanInd);
ycc = con.rate.baseAllMeanInd; 
h = hline(20,'k');
hold on;
h = hline(40,'k');
hold on;
h = hline(60,'k');
hold on;
h = hline(80,'k');
hold on;
h = hline(100,'k');
hold on;
h = hline(120,'k');
hold on;
h = hline(140,'k');
hold on;
h = bar(x,ycc,0.4,'w');
set(h,'linewidth',1);
title('Control - baseline');
ylabel('Baseline Nose Poke','fontsize',10);
set(gca,'XTick',1:1:length(con.rate.baseAllMeanInd));
set(gca,'XTickLabel',{'co01','co02','co03','co04','co05','co06','co07','co08'},'fontsize',10);
set(gca,'YTick',0:20:160);
set(gca,'YTickLabel',{'0','20','40','60','80','100','120','140','160'},'fontsize',10);  
axis([0.25 (length(con.rate.baseAllMeanInd)+.75) 0 160]);
box off;

subplot (2,1,2);
axis([0.25 (length(les.rate.baseAllMeanInd)+.75) 0 160]);
x = 1:length(les.rate.baseAllMeanInd);
ycc = les.rate.baseAllMeanInd; 
h = hline(20,'k');
hold on;
h = hline(40,'k');
hold on;
h = hline(60,'k');
hold on;
h = hline(80,'k');
hold on;
h = hline(100,'k');
hold on;
h = hline(120,'k');
hold on;
h = hline(140,'k');
hold on;
h = bar(x,ycc,0.4,'w');
set(h,'linewidth',1);
title('Lesion - baseline');
ylabel('Baseline Nose Poke','fontsize',10);
set(gca,'XTick',1:1:length(les.rate.baseAllMeanInd));
set(gca,'XTickLabel',{'le01','le02','le03','le04','le05','le06','le07','le08'},'fontsize',10);
set(gca,'YTick',0:20:160);
set(gca,'YTickLabel',{'0','20','40','60','80','100','120','140','160'},'fontsize',10);   
axis([0.25 (length(les.rate.baseAllMeanInd)+.75) 0 160]);
box off;
set(gcf,'Position',[300 300 600 400]);

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Make figure showing discrimination of each individual %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

figure;

subplot (2,1,1);
axis([0.25 (length(con.cer.cue100.cueMeanInd)+.75) -.4 1]);
ycc = [con.cer.cue0.cueMeanInd,...
       con.cer.cuePR.cueMeanInd,...
       con.cer.cue100.cueMeanInd];
h = bar(ycc,0.4,'w');
set(h,'linewidth',1);
title('Control - Discrimination');
set(h(1),'FaceColor',[0.0 1.0 1.0]);
set(h(2),'FaceColor',[0.8 0.0 1.0]);
set(h(3),'FaceColor',[1.0 0.0 0.0]);
ylabel('Suppression Ratio','fontsize',10);
set(gca,'XTick',1:1:length(con.cer.cue100.cueMeanInd));
set(gca,'XTickLabel',{'co01','co02','co03','co04','co05','co06','co07','co08'},'fontsize',10);
set(gca,'YTick',-.2:.2:1);
set(gca,'YTickLabel',{'-0.2','0.0','0.2','0.4','0.6','0.8','1.0'},'fontsize',10);  
axis([0.25 (length(con.cer.cue100.cueMeanInd)+.75) -.4 1]);
box off;

subplot (2,1,2);
axis([0.25 (length(les.cer.cue100.cueMeanInd)+.75) -.4 1]);
ycc = [les.cer.cue0.cueMeanInd,...
       les.cer.cuePR.cueMeanInd,...
       les.cer.cue100.cueMeanInd];
h = bar(ycc,0.4,'w');
set(h,'linewidth',1);
title('Lesion - Discrimination');
set(h(1),'FaceColor',[0.0 1.0 1.0]);
set(h(2),'FaceColor',[0.8 0.0 1.0]);
set(h(3),'FaceColor',[1.0 0.0 0.0]);
ylabel('Suppression Ratio','fontsize',10);
set(gca,'XTick',1:1:length(les.cer.cue100.cueMeanInd));
set(gca,'XTickLabel',{'le01','le02','le03','le04','le05','le06','le07','le08'},'fontsize',10);
set(gca,'YTick',-.2:.2:1);
set(gca,'YTickLabel',{'-0.2','0.0','0.2','0.4','0.6','0.8','1.0'},'fontsize',10);  
axis([0.25 (length(les.cer.cue100.cueMeanInd)+.75) -.4 1]);
box off;
set(gcf,'Position',[920 300 600 400]);

clear h ycc x;

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Make figure showing supression ratios for Con and Les %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

figure;

subplot (2,1,1);

x = 1;
ycc = [con.cer.cue100.cueMeanG;...
       con.cer.cuePR.cueMeanG;...
       con.cer.cue0.cueMeanG]; 

axis([0 2 -0.5 1]);
h = hline(0,'k');
hold on;
h = plot(x,ycc);
axis([0 2 -0.5 1]);
set(h,'linewidth',2.5);
set(h,'marker','o');
set(h(1),'MarkerFaceColor',[1.0 0.0 0.0]);
set(h(2),'MarkerFaceColor',[0.8 0.0 1.0]);
set(h(3),'MarkerFaceColor',[0.0 1.0 1.0]);
set(h(1),'MarkerEdgeColor',[1.0 0.0 0.0]);
set(h(2),'MarkerEdgeColor',[0.8 0.0 1.0]);
set(h(3),'MarkerEdgeColor',[0.0 1.0 1.0]);
title('Control - Cue');
ylabel('Level of Fear','fontsize',10);
set(gca,'XTick',0:1:2);
set(gca,'XTickLabel',{'','','','','','','','','','',''},'fontsize',10);
set(gca,'YTick',-0.5:.25:1);
set(gca,'YTickLabel',{'-0.50','-0.25','0.00','0.25','0.50','0.75','1.00'},'fontsize',10);  
box off;

subplot (2,1,2);

x = 1;
ycc = [les.cer.cue100.cueMeanG;...
       les.cer.cuePR.cueMeanG;...
       les.cer.cue0.cueMeanG]; 

axis([0 2 -0.5 1]);
h = hline(0,'k');
hold on;
h = plot(x,ycc);
axis([0 2 -0.5 1]);
set(h,'linewidth',2.5);
set(h,'marker','o');
set(h(1),'MarkerFaceColor',[1.0 0.0 0.0]);
set(h(2),'MarkerFaceColor',[0.8 0.0 1.0]);
set(h(3),'MarkerFaceColor',[0.0 1.0 1.0]);
set(h(1),'MarkerEdgeColor',[1.0 0.0 0.0]);
set(h(2),'MarkerEdgeColor',[0.8 0.0 1.0]);
set(h(3),'MarkerEdgeColor',[0.0 1.0 1.0]);
title('Lesion - Cue');
ylabel('Level of Fear','fontsize',10);
set(gca,'XTick',0:1:2);
set(gca,'XTickLabel',{'','','','','','','','','','',''},'fontsize',10);
set(gca,'YTick',-0.5:.25:1);
set(gca,'YTickLabel',{'-0.50','-0.25','0.00','0.25','0.50','0.75','1.00'},'fontsize',10);  
box off;
set(gcf,'Position',[1540 300 200 400]);

clearvars -except les con day; 

toc; % end timer